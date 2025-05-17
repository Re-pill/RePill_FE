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
      options: ['primary', 'secondary', 'ghost', 'link'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg', 'full'],
      control: { type: 'select' }
    }
  }
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md'
  },

  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ghost'],
      control: {
        type: 'select'
      }
    },

    size: {
      options: ['sm', 'md', 'lg', 'full'],
      control: {
        type: 'select'
      }
    }
  }
}

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'md'
  },

  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ghost'],
      control: {
        type: 'select'
      }
    },

    size: {
      options: ['sm', 'md', 'lg', 'full'],
      control: {
        type: 'select'
      }
    }
  }
}

export const Link: Story = {
  args: {
    children: "Button",
    variant: "link",
    size: "md"
  },

  argTypes: {
    variant: {
      options: ["primary", "secondary", "ghost", "link"],

      control: {
        type: "select"
      }
    },

    size: {
      options: ["sm", "md", "lg", "full"],

      control: {
        type: "select"
      }
    }
  }
};
