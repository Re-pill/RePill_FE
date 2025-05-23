import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot'

export const buttonVariants = cva(
  'inline-flex gap-2 justify-center items-center whitespace-nowrap rounded-full border-2 border-solid border-transparent transition-colors flex items-center justify-center h-12 px-5 w-auto text-base hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-bg text-black hover:bg-primary-bg-hover',
        secondary:
          'bg-secondary-bg text-black hover:bg-secondary-bg-hover hover:text-white',
        ghost:
          'border-secondary-bg-hover text-secondary-bg-hover hover:bg-secondary-bg-hover hover:border-transparent hover:text-background',
        link: 'text-secondary-bg-hover/90 underline underline-offset-4 hover:text-secondary-bg-hover transition-none'
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-13 px-5 text-sm sm:text-base',
        lg: 'h-14 px-6 text-base sm:text-lg',
        full: 'w-full h-13 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface PillButtonProps
  extends React.ComponentProps<'button'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function PillButton ({
  children,
  className,
  size = 'md',
  variant = 'primary',
  asChild = false,
  ...props
}: PillButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
