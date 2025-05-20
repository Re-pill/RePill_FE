'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
  // Check,
  // ChevronRight,
  Circle
} from 'lucide-react'

import { cn } from '@/utils/cn'

export const DropdownMenu = DropdownMenuPrimitive.Root

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuGroup = DropdownMenuPrimitive.Group

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

// export const DropdownMenuSub = DropdownMenuPrimitive.Sub

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// export const DropdownMenuSubTrigger = ({ className, inset, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
//   inset?: boolean
// }) => (
//   <DropdownMenuPrimitive.SubTrigger
//     className={cn(
//       'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
//       inset && 'pl-8',
//       className
//     )}
//     {...props}
//   >
//     {children}
//     <ChevronRight className='ml-auto' />
//   </DropdownMenuPrimitive.SubTrigger>
// )
// DropdownMenuSubTrigger.displayName =
//   DropdownMenuPrimitive.SubTrigger.displayName

// export const DropdownMenuSubContent = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
//   <DropdownMenuPrimitive.SubContent
//     className={cn(
//       'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
//       className
//     )}
//     {...props}
//   />
// )
// DropdownMenuSubContent.displayName =
//   DropdownMenuPrimitive.SubContent.displayName

export const DropdownMenuContent = ({ className, sideOffset = 4, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-3xl bg-secondary-bg p-1 text-black shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
)
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

export const DropdownMenuItem = ({ className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
}) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-secondary-bg-hover/50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

// export const DropdownMenuCheckboxItem = ({ className, children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => (
//   <DropdownMenuPrimitive.CheckboxItem
//     className={cn(
//       'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
//       className
//     )}
//     checked={checked}
//     {...props}
//   >
//     <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
//       <DropdownMenuPrimitive.ItemIndicator>
//         <Check className='h-4 w-4' />
//       </DropdownMenuPrimitive.ItemIndicator>
//     </span>
//     {children}
//   </DropdownMenuPrimitive.CheckboxItem>
// )
// DropdownMenuCheckboxItem.displayName =
//   DropdownMenuPrimitive.CheckboxItem.displayName

export const DropdownMenuRadioItem = ({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-secondary-bg-hover/50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className='h-2 w-2 fill-current' />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
)
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

export const DropdownMenuLabel = ({ className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export const DropdownMenuSeparator = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-secondary-bg-hover', className)}
    {...props}
  />
)
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

// export const DropdownMenuShortcut = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLSpanElement>) => {
//   return (
//     <span
//       className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
//       {...props}
//     />
//   )
// }
// DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'
