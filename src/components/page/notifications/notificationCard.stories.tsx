import { Meta, StoryObj } from '@storybook/react'
import { NotificationCard, NotificationCardProps } from '@/components/page/notifications/notificationCard'
import { PillTypes } from '@/types/pill'

const meta: Meta<typeof NotificationCard> = {
  title: 'Components/Page/Notifications/NotificationCard',
  component: NotificationCard,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.keys(PillTypes)
    },
    href: { control: 'text' },
    name: { control: 'text' },
    daysLeft: { control: 'number' },
    expirationDate: { control: 'text' },
    isActive: { control: 'boolean' }
  }
}

export default meta

type Story = StoryObj<NotificationCardProps>

export const Default: Story = {
  args: {
    href: '/notification/1',
    name: '타이레놀',
    type: 'pill',
    daysLeft: 3,
    expirationDate: '2025.05.25',
    isActive: false
  }
}

export const Active: Story = {
  args: {
    href: '/notification/1',
    name: '아목시실린',
    type: 'powder',
    daysLeft: 0,
    expirationDate: '2025.05.22',
    isActive: true
  }
}
