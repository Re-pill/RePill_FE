'use client'

import React from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { ko } from 'react-day-picker/locale'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/utils/cn'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  captionLabelClassName?: string
  dayClassName?: string
  dayButtonClassName?: string
  dropdownsClassName?: string
  footerClassName?: string
  monthClassName?: string
  monthCaptionClassName?: string
  monthGridClassName?: string
  monthsClassName?: string
  weekClassName?: string
  weekdayClassName?: string
  weekdaysClassName?: string
  rangeEndClassName?: string
  rangeMiddleClassName?: string
  rangeStartClassName?: string
  selectedClassName?: string
  disabledClassName?: string
  hiddenClassName?: string
  outsideClassName?: string
  todayClassName?: string
  selectTriggerClassName?: string
  navClassName?: string
  navButtonClassName?: string
}

export function Calendar({
  className,
  classNames,
  components: customComponents,
  ...props
}: CalendarProps) {
  const _monthsClassName = cn('relative', props.monthsClassName)
  const _monthCaptionClassName = cn(
    'flex h-7 items-center justify-center text-black',
    props.monthCaptionClassName
  )
  const _footerClassName = cn('pt-3 text-sm text-black', props.footerClassName)
  const _weekdaysClassName = cn('flex', props.weekdaysClassName)
  const _weekdayClassName = cn(
    'w-9 text-sm font-normal text-secondary',
    props.weekdayClassName
  )
  const _captionLabelClassName = cn(
    'truncate text-sm font-medium',
    props.captionLabelClassName
  )

  const _monthGridClassName = cn('mx-auto mt-4', props.monthGridClassName)
  const _weekClassName = cn('mt-2 flex w-max items-start', props.weekClassName)
  const _dayClassName = cn(
    'flex size-9 flex-1 items-center justify-center p-0 text-sm text-black',
    props.dayClassName
  )
  const _dayButtonClassName = cn(
    'inline-flex items-center justify-center size-9 rounded-full p-0 font-normal transition-none aria-selected:opacity-100 hover:cursor-pointer',
    props.dayButtonClassName
  )

  const buttonRangeClassName =
    'bg-primary-bg-hover [&>button]:bg-primary-bg [&>button]:text-black'
  const _rangeStartClassName = cn(
    buttonRangeClassName,
    'rounded-s-full',
    props.rangeStartClassName
  )
  const _rangeEndClassName = cn(
    buttonRangeClassName,
    'rounded-e-full',
    props.rangeEndClassName
  )
  const _rangeMiddleClassName = cn(
    'bg-primary-bg-hover [&>button]:bg-transparent',
    props.rangeMiddleClassName
  )
  const _selectedClassName = cn(
    '[&>button]:bg-primary-bg [&>button]:text-black',
    props.selectedClassName
  )
  const _todayClassName = cn('[&>button]:text-lime-600', props.todayClassName)
  const _disabledClassName = cn(
    'text-muted-foreground opacity-50',
    props.disabledClassName
  )
  const _hiddenClassName = cn('invisible flex-1', props.hiddenClassName)
  const _navClassName = cn('space-x-1 flex items-center', props.navClassName)
  const _navButtonPreviousClassName = cn(
    'absolute top-0 start-0 inline-flex items-center justify-center rounded-md h-7 w-7 bg-transparent p-0 text-black transition-opacity opacity-50 hover:opacity-100 hover:cursor-pointer',
    props.navButtonClassName
  )
  const _navButtonNextClassName = cn(
    'absolute top-0 end-0 inline-flex items-center justify-center rounded-md h-7 w-7 bg-transparent p-0 text-black transition-opacity opacity-50 hover:opacity-100 hover:cursor-pointer',
    props.navButtonClassName
  )

  return (
    <DayPicker
      locale={ko}
      navLayout='around'
      className={cn('sm:inline-block p-3', className)}
      classNames={{
        caption_label: _captionLabelClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        footer: _footerClassName,
        month: props.monthClassName,
        month_caption: _monthCaptionClassName,
        month_grid: _monthGridClassName,
        months: _monthsClassName,
        week: _weekClassName,
        weekday: _weekdayClassName,
        weekdays: _weekdaysClassName,
        range_end: _rangeEndClassName,
        range_middle: _rangeMiddleClassName,
        range_start: _rangeStartClassName,
        selected: _selectedClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
        today: _todayClassName,
        nav: _navClassName,
        button_previous: _navButtonPreviousClassName,
        button_next: _navButtonNextClassName,
        ...classNames
      }}
      components={{
        Chevron: ({ className, disabled, size, orientation }) => {
          let Comp: React.ElementType
          if (orientation === 'down') {
            Comp = ChevronDown
          } else if (orientation === 'up') {
            Comp = ChevronUp
          } else if (orientation === 'left') {
            Comp = ChevronLeft
          } else if (orientation === 'right') {
            Comp = ChevronRight
          } else {
            throw new Error('Invalid orientation')
          }

          return <Comp className={cn(className, `size-${size}`)} />
        },
        ...customComponents
      }}
      {...props}
    />
  )
}
