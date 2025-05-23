'use client'

import { FC } from 'react'
import { cn } from '@/utils/cn'
import { PillTypes } from '@/types/pill'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

export type NotificationCardProps = {
  href: string
  name: string
  type: keyof typeof PillTypes
  daysLeft: number
  expirationDate: string
  isActive?: boolean
  onClick?: () => void
} & React.ComponentProps<'div'>

export const NotificationCard: FC<NotificationCardProps> = ({
  name,
  type,
  daysLeft,
  expirationDate,
  isActive = false,
  onClick,
  ...props
}) => {
  const { ShapeComp, buttonClass } = PillTypes[type]

  const iconWrapperBase = 'w-7 h-7 rounded-full flex items-center justify-center -mt-6'
  const iconWrapperClass = isActive
    ? cn(iconWrapperBase, buttonClass.replace('bg', 'border'), 'bg-transparent')
    : cn(iconWrapperBase, buttonClass.replace('border', 'bg-gray-500/20'))

  const shapeClass = cn(
    'w-6 h-6',
    !isActive && type === 'powder' && '!text-gray-500',
    !isActive && (type === 'pill' || type === 'liquid') && '!bg-gray-500',
    !isActive && type !== 'etc' && '!fill-gray-500 !stroke-0'
  )

  let iconContent

  if (type === 'etc') {
    const iconSrc = isActive
      ? '/images/etc-pill-type.svg'
      : '/images/etc-pill-type-gray.svg'

    iconContent = (
      <Image
        src={iconSrc}
        alt=''
        width={24}
        height={24}
        className='w-6 h-6'
      />
    )
  } else {
    iconContent = <ShapeComp className={shapeClass} />
  }

  const iconElement = (
    <div className={iconWrapperClass}>
      {iconContent}
    </div>
  )

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
    : 'bg-gray-100'

  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer group flex items-center justify-between py-5 px-5 rounded-2xl',
        cardBackgroundClass
      )}
      {...props}
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
