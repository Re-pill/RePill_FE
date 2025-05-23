'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { PillTypes } from '@/types/pill'
import { ChevronLeft, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown'
import { PillTextInputRoot, PillTextInput } from '@/components/ui/pill-text-input'
import { ScrollArea } from '@/components/ui/scrollarea'
import { PillButton } from '@/components/ui/button/pill-button'
import { cn } from '@/utils/cn'
import { PillType, usePillStore, PillStore } from '@/stores/pillStore'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'

function InputWithAffixes ({
  prefix,
  suffix,
  value,
  className,
  prefixClassName,
  suffixClassName,
  readOnly = true
}: {
  prefix?: string
  prefixClassName?: string
  suffix?: string
  suffixClassName?: string
  value: string | number
  className?: string
  readOnly?: boolean
}) {
  return (
    <div className='relative'>
      <input
        readOnly={readOnly}
        value=''
        className={`rounded-full w-full h-13 px-4 border-2 border-solid border-secondary text-base text-transparent caret-transparent ${className}`}
      />
      <div className='absolute inset-0 flex items-center px-4 pointer-events-none text-base whitespace-pre'>
        {prefix && <span className='font-bold text-black'>{prefix}</span>}
        <span className='font-bold text-orange'>{value}</span>
        {suffix && <span className='font-bold text-black'>{suffix}</span>}
      </div>
    </div>
  )
}

export default function PillDetailPage () {
  const { id } = useParams()
  const router = useRouter()

  const pills = usePillStore((state: PillStore) => state.pills)
  const setActive = usePillStore((state: PillStore) => state.setActive)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pillDeleted, setPillDeleted] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const pill = pills.find((p: PillType) => p.id === Number(id))

  if (!pill && (pillDeleted || showDeleteConfirm)) {
    return (
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className='w-full max-w-sm mx-auto rounded-xl p-6 text-center'>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제되었어요.</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (!pill && pillDeleted) {
    return <Container>존재하지 않는 약 정보입니다.</Container>
  }

  const daysLeft = pill!.notifyBefore?.[0] ?? 0

  const handleBack = () => {
    if (pill!.isActive) {
      setActive(pill!.id, false)
    }
    router.push('/notification')
  }

  const handleDelete = () => {
    usePillStore.getState().setPills(
      pills.filter((p) => p.id !== pill!.id)
    )
    setIsDialogOpen(false)
    setPillDeleted(true)
    setShowDeleteConfirm(true)

    setTimeout(() => {
      setShowDeleteConfirm(false)
      router.push('/notification')
    }, 2000)
  }

  return (
    <Container className='pt-6 pb-12'>
      <div className='flex justify-start mb-12'>
        <button onClick={handleBack}>
          <ChevronLeft className='w-6 h-6' />
        </button>
      </div>

      <div className='flex items-center justify-between mb-0'>
        <p className='text-sm font-semibold text-black'>폐기까지</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <MoreVertical className='w-6 h-6' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='p-2 rounded-xl bg-background text-black border border-secondary w-fit min-w-0 shadow-md'
          >
            <DropdownMenuItem
              onClick={() => router.push(`/notification/${id}/update`)}
              className='flex items-center gap-3.5 px-2 py-1.5 rounded-md'
            >
              <Pencil className='w-4 h-4 text-secondary' strokeWidth={3} />
              <span className='text-sm font-bold text-secondary'>수정</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDialogOpen(true)}
              className='flex items-center gap-3.5 px-2 py-1.5 rounded-md'
            >
              <Trash2 className='w-4 h-4 text-secondary' strokeWidth={3} />
              <span className='text-sm font-bold text-secondary'>삭제</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent
          sadFace
          className='w-full max-w-sm mx-auto rounded-xl p-6'
        >
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>삭제하면 복구가 불가능해요.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDelete}>네</AlertDialogAction>
            <AlertDialogCancel>아니요</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='mb-10'>
        <div className='flex items-center gap-2'>
          <span className='text-6xl font-bold text-secondary'>D-</span>
          <div className='w-20 h-20 rounded-full bg-secondary-bg flex items-center justify-center'>
            <span className='text-6xl font-bold text-error'>{daysLeft}</span>
          </div>
        </div>
      </div>

      <div className='space-y-6'>
        <div>
          <p className='text-sm font-semibold text-black mb-3'>약품명</p>
          <PillTextInputRoot>
            <PillTextInput value={pill!.name} readOnly />
          </PillTextInputRoot>
        </div>

        <div>
          <p className='text-sm font-semibold text-black mb-3'>종류</p>
          <ScrollArea className='w-full'>
            <div className='flex w-max space-x-4'>
              {Object.entries(PillTypes)
                .filter(([key]) => key === pill!.type)
                .map(([key, value]) => (
                  <PillButton
                    key={key}
                    variant='ghost'
                    className={cn(
                      'gap-8 font-semibold text-black cursor-default',
                      value.buttonClass
                    )}
                    onClick={(e: React.MouseEvent) => e.preventDefault()}
                  >
                    <value.ShapeComp />
                    <span className='text-sm'>{value.label}</span>
                  </PillButton>
                ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <p className='text-sm font-semibold text-black mb-3'>복용횟수</p>
          <PillTextInputRoot>
            <InputWithAffixes
              prefix='하루  '
              value={pill!.dailyDose}
              suffix='회'
            />
          </PillTextInputRoot>
        </div>

        <div>
          <p className='text-sm font-semibold text-black mb-3'>유통기한</p>
          <PillTextInputRoot>
            <PillTextInput value={pill!.expirationDate} readOnly />
          </PillTextInputRoot>
        </div>

        <div>
          <p className='text-sm font-semibold text-black mb-3'>알림</p>
          <div className='flex flex-col gap-3'>
            {pill!.notifyBefore.map((n: number, i: number) => (
              <PillTextInputRoot key={i}>
                <InputWithAffixes
                  prefix='유통기한으로부터 D-'
                  value={n}
                  prefixClassName='text-black'
                  className='text-orange font-bold'
                />
              </PillTextInputRoot>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
