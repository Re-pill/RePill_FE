import type { Meta, StoryObj } from '@storybook/react'
import { BorderlessIconButton } from './borderless-icon-button'
import { BellIcon } from 'lucide-react'

const meta: Meta<typeof BorderlessIconButton> = {
  component: BorderlessIconButton,
  title: 'Components/BorderlessIconButton'
}

export default meta

type Story = StoryObj<typeof BorderlessIconButton>

export const Default: Story = {
  args: {
    children: <BellIcon />,
    variant: 'default',
    size: 'md'
  },
  argTypes: {
    variant: {
      options: ['default', 'danger', 'accent'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    showDot: {
      control: { type: 'boolean' }
    }
  }
}

export const Danger: Story = {
  args: {
    children: <BellIcon />,
    variant: 'danger',
    size: 'md'
  },
  argTypes: Default.argTypes
}

export const Accent: Story = {
  args: {
    children: <BellIcon />,
    variant: 'accent',
    size: 'md'
  },
  argTypes: Default.argTypes
}

export const WithDot: Story = {
  args: {
    children: <BellIcon />,
    variant: 'danger',
    size: 'md',
    showDot: true
  },
  argTypes: Default.argTypes
}