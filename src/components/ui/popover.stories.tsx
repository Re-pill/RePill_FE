import type { Meta, StoryObj } from '@storybook/react'
import {
  Popover as PopoverComp,
  PopoverContent,
  PopoverTrigger
} from './popover'
import type { PopoverProps } from '@radix-ui/react-popover'
import { PillButton } from './button/pill-button'

const meta: Meta<typeof PopoverComp> = {
  component: PopoverComp,
  subcomponents: {
    PopoverContent,
    PopoverTrigger
  }
}

export default meta
type Story = StoryObj<typeof PopoverComp>

export const Popover: Story & {
  args: {
    triggerText?: string
    contentText?: string
  }
} = {
  args: {
    triggerText: 'Click me',
    contentText: 'Hello world'
  },
  render: ({
    triggerText,
    contentText
  }: PopoverProps & {
    triggerText?: string
    contentText?: string
  }) => (
    <PopoverComp>
      <PopoverTrigger>
        <PillButton>{triggerText}</PillButton>
      </PopoverTrigger>
      <PopoverContent>{contentText}</PopoverContent>
    </PopoverComp>
  )
}
