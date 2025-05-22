'use client'

import { FC } from 'react'
import { cn } from '@/utils/cn'
import { PillTypes } from '@/types/pill'
import { ChevronRight, Triangle } from 'lucide-react'

export type NotificationCardProps = {
  href: string
  name: string
  type: keyof typeof PillTypes
  daysLeft: number
  expirationDate: string
  isActive?: boolean
  onClick?: () => void
}

export const NotificationCard: FC<NotificationCardProps> = ({
  href,
  name,
  type,
  daysLeft,
  expirationDate,
  isActive = false,
  onClick,
}) => {
  const { ShapeComp, buttonClass } = PillTypes[type]

  const iconWrapperBase = 'w-7 h-7 rounded-full flex items-center justify-center -mt-6'
  const iconWrapperClass = isActive
    ? cn(iconWrapperBase, buttonClass.replace('bg', 'border'), 'bg-transparent')
    : cn(iconWrapperBase, buttonClass.replace('border', 'bg'), 'bg-opacity-20')

  let iconElement

  if (isActive) {
    iconElement = (
      <div className={iconWrapperClass}>
        <ShapeComp className='w-full h-full' />
      </div>
    )
  } else {
    if (type === 'powder') {
      iconElement = (
        <div className={iconWrapperClass}>
          <Triangle className='w-full h-full fill-gray-500 stroke-0' />
        </div>
      )
    } else if (type === 'etc') { // 이미지라서 이렇게라도 해놨는데, 사다리꼴 모양을 어떻게 만들어야할지 모르겠어요ㅠㅠ
      iconElement = (
        <div className={iconWrapperClass}>
          <div
            className='w-6 h-6 bg-gray-500'
            style={{
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
              borderRadius: '7px'
            }}
          />
        </div>
      )
    } else {
      iconElement = (
        <div className={iconWrapperClass}>
          <ShapeComp className='w-full h-full bg-gray-500' />
        </div>
      )
    }
  }

  const nameClass = cn(
    'text-lg font-semibold',
    isActive ? 'text-primary' : 'text-secondary'
  )

  const ddayClass = cn(
    'text-lg font-normal',
    isActive ? 'text-error' : 'text-secondary'
  )

  const chevronClass = cn(
    'w-5 h-5',
    isActive ? 'text-primary' : 'text-secondary'
  )

  const cardBackgroundClass = isActive
    ? 'bg-secondary-bg'
    : 'bg-gray-100' // 비활성화일 때 더 연한 배경

  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer group flex items-center justify-between py-5 px-5 rounded-2xl',
        cardBackgroundClass
      )}
    >
      <div className='flex items-center gap-3'>
        {iconElement}

        <div className='flex flex-col'>
          <div className='flex items-baseline gap-1'>
            <span className={nameClass}>{name}</span>
            <span className={ddayClass}>D-{daysLeft}</span>
          </div>
          <div className='mt-2 text-sm font-normal text-secondary'>
            {expirationDate}
          </div>
        </div>
      </div>

      <ChevronRight className={chevronClass} />
    </div>
  )
}
