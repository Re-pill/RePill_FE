'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { PillTypes, type Pill } from '@/types/pill'
import { PictureUploadButton } from '@/components/page/scan/upload-picture-button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown'
import { HappyFace } from '@/components/icons/happy-face'
import { PillButton } from '@/components/ui/button/pill-button'
import { ChevronDown, Plus, CalendarIcon } from 'lucide-react'
import { PillTextInput, PillTextInputRoot } from '@/components/ui/pill-text-input'
import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/utils/cn'

const scanSchema = z.object({
  image: z.instanceof(File, {
    message: '파일을 업로드 해주세요.'
  }).nullable(),
  name: z.string().min(1, {
    message: '약 이름이 적혀있지 않아요.'
  }),
  type: z.enum(Object.keys(PillTypes) as [string, ...string[]]),
  pillID: z.number(),
  discardDate: z.date({
    required_error: '폐기 날짜가 적혀있지 않아요.'
  }),
})

// TODO: Actually fetch the pills from the server
const dummyPills: Pill[] = [
  {
    id: 1,
    name: '타이레놀',
    type: 'pill',
    expirationDate: new Date('2024-12-31')
  },
  {
    id: 2,
    name: '부루펜',
    type: 'pill',
    expirationDate: new Date('2025-01-15')
  },
  {
    id: 3,
    name: '시럽약',
    type: 'liquid',
    expirationDate: new Date('2024-06-30')
  }
]

const ScanForm = ({
  onSubmitSuccess = () => {},
  onSubmitError = () => {}
}: {
  onSubmitSuccess?: (data: z.infer<typeof scanSchema>) => void
  onSubmitError?: (error: unknown) => void
}) => {
  const form = useForm<z.infer<typeof scanSchema>>({
    resolver: zodResolver(scanSchema),
    defaultValues: {
      image: null,
      name: '',
      type: 'pill',
      discardDate: new Date(),
      pillID: 0
    }
  })

  const pills: (Omit<Pill, 'type' | 'expirationDate'> & {
    type?: keyof typeof PillTypes
    expirationDate?: Date
  })[] = [
    ...dummyPills,
    {
      id: 0,
      name: '추가하기'
    }
  ]

  const PillTypeIcon = (type: keyof typeof PillTypes | undefined | null, className?: string) => {
    if (type) {
      const { ShapeComp } = PillTypes[type]
      return <ShapeComp className={className} />
    } else {
      return (
        <Plus className={
        cn(
          'w-6 h-6',
          className
        )
      }
        />
      )
    }
  }

  const onSubmit = (data: z.infer<typeof scanSchema>) => {
    // TODO: Actually send the data to the server
    try {
      // For testing failure
      // throw new Error('Test error')
      console.log(data)
      onSubmitSuccess(data)
      form.reset()
    } catch (error) {
      console.error(error)
      onSubmitError(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center'>
              <div className='flex flex-col items-left gap-2'>
                <FormControl>
                  <PictureUploadButton
                    image={field.value} onImageChange={(file) => {
                      field.onChange(file)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {
          form.getValues('image') && (
            <>
              <FormField
                control={form.control}
                name='pillID'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>분리배출한 폐의약품 정보를 입력해 주세요.</FormLabel>
                    <div className='h-1' />
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className='focus:outline-none'>
                          <PillButton size='full' variant='ghost' className='relative z-50 bg-background group'>
                            <div className='flex w-full'>
                              <div className='grow'>
                                <div className='flex gap-2'>
                                  {PillTypeIcon(pills.find((pill) => pill.id === field.value)?.type)}
                                  <span className='text-sm font-bold text-black group-hover:text-white'>
                                    {pills.find((pill) => pill.id === field.value)?.name}
                                  </span>
                                </div>
                              </div>
                              <ChevronDown className='h-6 w-6' />
                            </div>
                          </PillButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='dropdown-content-width-full pt-7.5 rounded-t-none z-40' sideOffset={-26} side='bottom'>
                          <DropdownMenuRadioGroup
                            value={String(field.value)} onValueChange={(value) => {
                              const id = Number(value)
                              field.onChange(id)
                              const selectedPill = pills.find((pill) => pill.id === id)
                              if (selectedPill) {
                                form.setValue('type', selectedPill.type as string | undefined ?? 'pill')
                                form.setValue('name', selectedPill.name === '추가하기' ? '' : selectedPill.name)
                              }
                            }}
                          >
                            {pills.map((pill) => (
                              <DropdownMenuRadioItem
                                key={pill.id}
                                value={String(pill.id)}
                                onClick={() => {
                                  field.onChange(pill.id)
                                }}
                              >
                                <div className='flex gap-4 items-center'>
                                  {PillTypeIcon(pill.type, 'w-4 h-4')}
                                  <span className='text-sm font-bold text-secondary'>
                                    {pill.name}
                                  </span>
                                </div>
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                form.getValues('pillID') === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>약품명</FormLabel>
                          <div className='h-1' />
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
                          <div className='h-1' />
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
                  </>
                )
              }
              <FormField
                control={form.control}
                name='discardDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>폐기 날짜</FormLabel>
                    <div className='h-1' />
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
                          onSelect={(...args) => { field.onChange(...args) }}
                          disabled={(date) => date > new Date()}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )
        }
        {form.getValues('image') && (
          <PillButton
            type='submit'
            variant='primary'
            size='full'
            className='bg-[#055FF1] hover:bg-[#044CC0] font-semibold text-white'
          >
            인증하기
          </PillButton>
        )}
      </form>
    </Form>
  )
}

export default function ScanPage () {
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [openFailed, setOpenFailed] = React.useState(false)

  return (
    <>
      <div className='relative'>
        <div
          className='absolute top-20 left-58.5 rounded-full w-24 h-24 -z-10'
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, #3261D7 0%, transparent 100%)'
          }}
        />
      </div>
      <span className='text-2xl font-bold pt-20'>
        폐의약품을 분리배출하셨나요?
      </span>
      <div className='flex gap-4 pb-20'>
        <span className='text-2xl font-bold'>
          인증하면 기록할 수 있어요.
        </span>
        <HappyFace className='h-8 w-8' />
      </div>
      <ScanForm
        onSubmitSuccess={() => {
          setOpenSuccess(true)
        }} onSubmitError={() => {
          setOpenFailed(true)
        }}
      />
      <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>인증 완료!</AlertDialogTitle>
            <AlertDialogDescription>
              MY에서 그동안 분리 배출한 폐의약품을 확인할 수 있어요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenSuccess(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={openFailed} onOpenChange={setOpenFailed}>
        <AlertDialogContent sadFace>
          <AlertDialogHeader>
            <AlertDialogTitle>인증하는데 실패했어요.</AlertDialogTitle>
            <AlertDialogDescription>
              잠시 후에 다시 시도해주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenFailed(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
