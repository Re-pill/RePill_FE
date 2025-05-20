import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from './calendar'

const meta: Meta<typeof Calendar> = {
  component: Calendar
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Single: Story = {
  args: {
    mode: 'single'
  },
  argTypes: {
    mode: {
      options: ['single', 'multiple', 'range'],
      control: { type: 'select' }
    }
  }
}

export const Multiple: Story = {
  args: {
    mode: 'multiple'
  },

  argTypes: {
    mode: {
      options: ['single', 'multiple', 'range'],

      control: {
        type: 'select'
      }
    }
  }
}

export const Range: Story = {
  args: {
    mode: 'range'
  },

  argTypes: {
    mode: {
      options: ['single', 'multiple', 'range'],

      control: {
        type: 'select'
      }
    }
  }
}
