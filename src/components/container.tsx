import { cn } from '@/utils/cn'

export function Container ({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col min-h-screen max-w-md px-2 py-2 mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
