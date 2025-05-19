import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'

export type PillTextInputRootProps = React.ComponentProps<'div'>

export function PillTextInputRoot ({
  children,
  className,
  ...props
}: PillTextInputRootProps) {
  return (
    <div
      className={cn(
        'relative text-secondary-bg-hover [&:has(input:placeholder-shown)]:text-secondary-bg [&:has(input:focus)]:text-secondary-bg-hover! transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function PillTextInputIcon ({
  children,
  className,
  pos = 'left'
}: {
  children: React.ReactNode
  className?: string
  pos?: 'left' | 'right'
}) {
  return (
    <Slot
      role='presentation'
      className={cn(
        'absolute top-3 pointer-events-none size-5',
        pos === 'left' ? 'left-4 [&~input]:pl-11' : 'right-4',
        className
      )}
    >
      {children}
    </Slot>
  )
}

export interface PillTextInputProps
  extends Omit<React.ComponentProps<'input'>, 'type'> {
  icon?: React.ReactNode
}

export function PillTextInput ({ className, ...props }: PillTextInputProps) {
  return (
    <input
      className={cn(
        'rounded-full w-full h-13 px-4 border-2 border-solid border-secondary-bg-hover placeholder-shown:border-secondary-bg bg-transparent text-base font-bold text-black transition-colors placeholder:text-secondary-bg placeholder:font-medium focus:border-secondary-bg-hover focus:placeholder:text-secondary disabled:cursor-not-allowed focus-visible:outline-0',
        className
      )}
      type='text'
      {...props}
    />
  )
}
