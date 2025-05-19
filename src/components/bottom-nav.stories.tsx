import type { Meta, StoryObj } from '@storybook/react'

import { BottomNav } from './bottom-nav'

const meta: Meta<typeof BottomNav> = {
  component: BottomNav
}

export default meta
type Story = StoryObj<typeof BottomNav>

export const Single: Story = {
  args: {
    selected: '/find'
  },
  argTypes: {
    selected: {
      options: ['/find', '/add', '/scan', '/notification', '/me'],
      control: { type: 'select' }
    }
  }
}
