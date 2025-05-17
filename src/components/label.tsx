'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/utils/cn'

const Label = ({ className, ...props }: LabelPrimitive.LabelProps) => (
  <LabelPrimitive.Root
    className={cn(
      'text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
