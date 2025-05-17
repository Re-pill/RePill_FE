import type { Meta, StoryObj } from '@storybook/react'

import { PillButton } from './pill-button'

const meta: Meta<typeof PillButton> = {
  component: PillButton
}

export default meta
type Story = StoryObj<typeof PillButton>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ghost'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg', 'full'],
      control: { type: 'select' }
    }
  }
}
