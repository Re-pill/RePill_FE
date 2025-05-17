import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const variants = cva(
  'rounded-full border-2 border-solid border-transparent transition-colors flex items-center justify-center h-12 px-5 w-auto text-base',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-black hover:bg-primary-hover',
        secondary: 'bg-secondary text-background hover:bg-secondary-hover',
        ghost:
          'border-secondary text-secondary hover:bg-secondary-hover hover:border-transparent hover:text-background'
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
    VariantProps<typeof variants> {}

export function PillButton({
  children,
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: PillButtonProps) {
  return (
    <button className={cn(variants({ size, variant }), className)} {...props}>
      {children}
    </button>
  )
}
