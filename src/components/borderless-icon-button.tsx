import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Slot } from '@radix-ui/react-slot'

const iconButtonVariants = cva(
  'relative inline-flex items-center justify-center p-2 rounded-full transition-colors disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'text-secondary hover:bg-secondary-bg-hover',
        withDot: 'text-secondary hover:bg-secondary-bg-hover',
        accent: 'text-primary-bg hover:bg-primary-bg/10'
      },
      size: {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

export interface BorderlessIconButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
}

export function BorderlessIconButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  asChild = false,
  ...props
}: BorderlessIconButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {variant === 'withDot' && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      )}
    </Comp>
  )
}