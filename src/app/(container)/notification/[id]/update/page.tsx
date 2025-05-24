'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePillStore } from '@/stores/pillStore'
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from '@/components/ui/form'
import {
  PillTextInputRoot,
  PillTextInput
} from '@/components/ui/pill-text-input'
import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea'
import { PillTypes } from '@/types/pill'
import { PillButton } from '@/components/ui/button/pill-button'
import { cn } from '@/utils/cn'
import { ChevronLeft, Plus, XCircle } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Container } from '@/components/ui/container'
import { BorderlessIconButton } from '@/components/ui/button/borderless-icon-button'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const pillFormSchema = z.object({
  name: z.string().min(1),
  type: z.enum(Object.keys(PillTypes) as [string, ...string[]]),
  dailyDose: z.number().min(1),
  expirationDate: z.date(),
  notifyBefore: z.array(z.number()).min(1)
})

type PillFormValues = z.infer<typeof pillFormSchema>

export default function PillUpdatePage () {
  const { id } = useParams()
  const router = useRouter()
  const pill = usePillStore((s) => s.pills.find((p) => p.id === Number(id)))

  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<PillFormValues>({
    resolver: zodResolver(pillFormSchema),
    defaultValues: pill
      ? {
          name: pill.name,
          type: pill.type,
          dailyDose: pill.dailyDose,
          expirationDate: new Date(pill.expirationDate),
          notifyBefore: pill.notifyBefore
        }
      : undefined
  })

  const onSubmit = (data: PillFormValues) => {
    usePillStore.getState().updatePill(pill!.id, {
      ...data,
      expirationDate: data.expirationDate.toISOString()
    })
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      router.push('/notification')
    }, 2000)
  }

  if (!pill) return <Container>존재하지 않는 약 정보입니다.</Container>

  return (
    <Container className='pt-6 pb-12'>
      <div className='flex justify-start mb-4'>
        <button onClick={() => router.push('/notification')}>
          <ChevronLeft className='w-6 h-6' />
        </button>
      </div>

      <div className='relative'>
        <div
          className='absolute top-[-1rem] left-53 rounded-full w-24 h-24 -z-10'
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #BFFF00 0%, transparent 100%)' }}
        />
      </div>
      <p className='text-2xl font-bold pt-8 pb-8'>지금 복용 중인 약이 있나요?</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>약품명</FormLabel>
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
                <FormControl>
                  <ScrollArea className='w-full'>
                    <div className='flex w-max space-x-4'>
                      {Object.entries(PillTypes).map(([key, value]) => (
                        <PillButton
                          key={key}
                          variant='ghost'
                          className={cn(
                            'gap-8 text-black',
                            field.value === key
                              ? `${value.buttonClass} border-2`
                              : 'border-2 border-secondary-bg bg-white'
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
                <FormControl>
                  <div className='flex items-center rounded-full border-2 border-secondary px-4 h-13'>
                    <span className='text-base font-bold text-black'>하루 &nbsp;</span>
                    <input
                      type='text'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      className='w-6 text-center font-bold text-orange text-base bg-transparent focus:outline-none leading-tight relative'
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value.replace(/[^0-9]/g, '')))}
                      style={{ width: '1.5rem', marginRight: '-0.15rem' }}
                    />
                    <span className='text-base font-bold text-black'>회</span>
                  </div>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <PillButton variant='ghost' size='full' className='text-black group'>
                        <div className='flex w-full flex-row gap-4'>
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
                      onSelect={(value) => field.onChange(value)}
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
                <FormControl>
                  <div className='flex flex-col gap-3'>
                    {field.value.map((value, index) => (
                      <div
                        key={index}
                        className='relative w-full flex items-center rounded-full border-2 border-secondary px-4 h-13'
                      >
                        <span className='text-base font-bold text-black'>유통기한으로부터 D-</span>
                        <input
                          type='text'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          className='w-6 text-center font-bold text-orange text-base bg-transparent focus:outline-none'
                          value={value}
                          onChange={(e) => {
                            const onlyNum = e.target.value.replace(/[^0-9]/g, '')
                            const newArray = [...field.value]
                            newArray[index] = Number(onlyNum)
                            field.onChange(newArray)
                          }}
                          style={{ width: '1.5rem', marginLeft: '-0.1rem' }}
                        />
                        {index > 0 && (
                          <BorderlessIconButton
                            className='absolute right-2 top-1 hover:bg-secondary-hover'
                            onClick={(e) => {
                              e.preventDefault()
                              const newArray = [...field.value]
                              newArray.splice(index, 1)
                              field.onChange(newArray)
                            }}
                          >
                            <XCircle />
                          </BorderlessIconButton>
                        )}
                      </div>
                    ))}
                    <PillButton
                      variant='secondary'
                      size='full'
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

          <PillButton type='submit' variant='primary' size='full'>수정하기</PillButton>
        </form>
      </Form>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className='w-full max-w-sm mx-auto rounded-xl p-6 text-center'>
          <AlertDialogHeader>
            <AlertDialogTitle>수정되었습니다.</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  )
}
