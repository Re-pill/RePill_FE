'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/form'
import { PillTextInput, PillTextInputRoot } from '@/components/pill-text-input'
import { Container } from '@/components/container'
import { PillTypes } from '@/types/pill'
import { PillButton } from '@/components/pill-button'
import { cn } from '@/utils/cn'
import { ScrollArea, ScrollBar } from '@/components/scrollarea'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'
import { Calendar as CalendarIcon, Plus } from 'lucide-react'
import { Calendar } from '@/components/calendar'

const pillAddSchema = z.object({
  name: z.string().min(1, {
    message: '약 이름이 적혀있지 않아요.'
  }),
  type: z.enum(Object.keys(PillTypes) as [string, ...string[]]),
  dailyDose: z
    .number({
      required_error: '복용량이 적혀있지 않아요.'
    })
    .min(1, {
      message: '복용량은 1회 이상이어야 해요.'
    }),
  expirationDate: z.date({
    required_error: '유통기한이 적혀있지 않아요.'
  }),
  notifyBefore: z
    .array(z.number())
    .min(1, {
      message: '최소 한 개의 알림을 설정해주세요.'
    })
    .refine(
      (val) => {
        const unique = new Set(val)
        return unique.size === val.length
      },
      {
        message: '알림은 중복으로 받을 수 없어요.'
      }
    )
})

function InputWithAffixes({
  prefix,
  prefixClassName,
  suffix,
  suffixClassName,
  value,
  placeholder,
  onChange,
  ...props
}: React.ComponentProps<typeof PillTextInput> & {
  prefix?: string
  prefixClassName?: string
  suffix?: string
  suffixClassName?: string
}) {
  const [text, setText] = React.useState(String(value))
  const prefixRef = React.useRef<HTMLSpanElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const mirrorRef = React.useRef<HTMLSpanElement>(null)
  const suffixRef = React.useRef<HTMLSpanElement>(null)
  const [prefixW, setPrefixW] = React.useState(0)
  const [w, setW] = React.useState(0)
  const [wrapperW, setWrapperW] = React.useState(0)
  const [suffixW, setSuffixW] = React.useState(0)

  React.useLayoutEffect(() => {
    setPrefixW(prefixRef.current?.offsetWidth ?? 0)
    setW(mirrorRef.current?.offsetWidth ?? 0)
    setWrapperW(wrapperRef.current?.offsetWidth ?? 0)
    setSuffixW(suffixRef.current?.offsetWidth ?? 0)
  }, [text, prefix, placeholder, suffix])

  // calculate clamped position: never overflow wrapper
  const maxLeft = wrapperW - suffixW - 8
  const leftPos = Math.min(w + 18, maxLeft)
  // always reserve padding for suffix
  const padRight = suffixW + 8

  return (
    <div className='relative' ref={wrapperRef}>
      {prefix && (
        <span
          className={cn(
            'absolute top-3.5 left-4 text-base font-bold',
            prefixClassName
          )}
          ref={prefixRef}
        >
          {prefix}
        </span>
      )}
      <span
        ref={mirrorRef}
        className='absolute top-0 left-0 invisible whitespace-pre text-base font-bold'
      >{`${prefix || ''}${text || placeholder}`}</span>

      <PillTextInput
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          onChange && onChange(e)
          setText(e.target.value)
        }}
        style={{ paddingLeft: prefixW + 14, paddingRight: padRight }}
        {...props}
      />

      {suffix && (
        <span
          ref={suffixRef}
          className={cn('absolute top-3.5', suffixClassName)}
          style={leftPos < maxLeft ? { left: leftPos } : { right: 8 }}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}

const AddForm = () => {
  const form = useForm<z.infer<typeof pillAddSchema>>({
    resolver: zodResolver(pillAddSchema),
    defaultValues: {
      name: '',
      type: 'pill',
      dailyDose: 1,
      expirationDate: new Date(),
      notifyBefore: [1]
    }
  })

  const onSubmit = (data: z.infer<typeof pillAddSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>약품명</FormLabel>
              <div className='h-1'></div>
              <FormControl>
                <PillTextInputRoot>
                  <PillTextInput {...field} placeholder='ex. 타이레놀' />
                </PillTextInputRoot>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>종류</FormLabel>
              <div className='h-1'></div>
              <FormControl>
                <ScrollArea className='w-full'>
                  <div className='flex w-max space-x-4'>
                    {Object.entries(PillTypes).map(([key, value]) => (
                      <PillButton
                        key={key}
                        variant='ghost'
                        className={cn(
                          'gap-6 text-black',
                          field.value === key && value.buttonClass
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          field.onChange(key)
                        }}
                      >
                        <value.ShapeComp />
                        {value.label}
                      </PillButton>
                    ))}
                  </div>
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dailyDose'
          render={({ field }) => (
            <FormItem>
              <FormLabel>복용횟수</FormLabel>
              <div className='h-1'></div>
              <FormControl>
                <PillTextInputRoot>
                  <InputWithAffixes
                    {...field}
                    placeholder='1'
                    inputMode='decimal'
                    pattern='(?:[1-9]\d*)'
                    autoComplete='off'
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^0-9]/g, '')
                        .replace(/^0$/, '')
                      field.onChange(value ? parseInt(value) : 0)
                      e.target.value = value
                    }}
                    prefix='하루 '
                    prefixClassName={cn(
                      'font-medium pr-1',
                      field.value !== 0 && 'font-bold text-black'
                    )}
                    suffix='회'
                    suffixClassName={cn(
                      'font-medium',
                      field.value !== 0 && 'font-bold text-black'
                    )}
                    className='text-[#FF7447]'
                  />
                </PillTextInputRoot>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='expirationDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>유통기한</FormLabel>
              <div className='h-1'></div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <PillButton
                      variant='ghost'
                      size='full'
                      className='text-black group'
                    >
                      <div className='flex w-full flex-row gap-4'>
                        <CalendarIcon className='w-6 h-6 text-secondary-bg-hover group-hover:text-white' />
                        <span className='font-bold text-base'>
                          {field.value.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </span>
                      </div>
                    </PillButton>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='notifyBefore'
          render={({ field }) => (
            <FormItem>
              <FormLabel>알림</FormLabel>
              <div className='h-1'></div>
              <FormControl>
                <div className='flex flex-col gap-4'>
                  {field.value.map((value, index) => {
                    const updateValue = (newValue: number) => {
                      const newArray = [...field.value]
                      newArray[index] = newValue
                      field.onChange(newArray)
                    }

                    return (
                      <PillTextInputRoot key={index}>
                        <InputWithAffixes
                          {...field}
                          placeholder='1'
                          inputMode='decimal'
                          pattern='(?:[1-9]\d*)'
                          autoComplete='off'
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/[^0-9]/g, '')
                              .replace(/^0$/, '')
                            updateValue(value ? parseInt(value) : 0)
                            e.target.value = value
                          }}
                          value={value}
                          prefix='유통기한으로 부터 D-'
                          prefixClassName={cn(
                            'font-medium',
                            field.value[index] !== 0 && 'font-bold text-black'
                          )}
                          className='text-[#FF7447]'
                        />
                      </PillTextInputRoot>
                    )
                  })}
                  <PillButton
                    variant='secondary'
                    size='full'
                    className='group'
                    onClick={(e) => {
                      e.preventDefault()
                      field.onChange([...field.value, 1])
                    }}
                  >
                    <Plus className='w-6 h-6 text-secondary-bg-hover group-hover:text-white' />
                  </PillButton>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PillButton
          type='submit'
          variant='primary'
          size='full'
          className='font-semibold text-black'
        >
          등록하기
        </PillButton>
      </form>
    </Form>
  )
}

export default function Add() {
  return (
    <>
      <Container>
        <div className='relative'>
          <div
            className='absolute top-10 right-8 rounded-full w-24 h-24 -z-10'
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, #BFFF00 0%, #FFFFFF 100%)'
            }}
          />
        </div>
        <p className='text-2xl font-bold pt-20 pb-8'>
          지금 복용 중인 약이 있나요?
        </p>
        <AddForm />
      </Container>
    </>
  )
}
