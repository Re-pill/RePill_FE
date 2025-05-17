import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'

export interface PillTextInputRootProps extends React.ComponentProps<'div'> {}

export function PillTextInputRoot({
  children,
  className,
  ...props
}: PillTextInputRootProps) {
  return (
    <div
      className={cn(
        'relative text-secondary focus-within:text-secondary-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function PillTextInputIcon({
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

export function PillTextInput({ className, ...props }: PillTextInputProps) {
  const ref = React.useRef<HTMLInputElement>(null)

  return (
    <input
      className={cn(
        'rounded-full w-full h-13 px-4 border-2 border-solid border-white placeholder-shown:border-secondary bg-transparent text-base font-bold text-black transition-colors placeholder:text-secondary focus:border-white focus:placeholder:text-secondary-hover disabled:cursor-not-allowed focus-visible:outline-0',
        className
      )}
      type='text'
      ref={ref}
      {...props}
    />
  )
}
