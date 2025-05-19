import type { Meta, StoryObj } from '@storybook/react'

import { Toaster } from './toaster'
import { PillButton } from '../pill-button'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from './toast'

const meta: Meta<typeof Toaster> = {
  component: Toaster
}

export default meta
type Story = StoryObj<typeof Toaster>

export const SimpleToast: Story = {
  render: () => {
    const { toast } = useToast()

    return (
      <>
        <PillButton
          onClick={() =>
            toast({
              description: 'Toast Description'
            })
          }
        >
          Toast!
        </PillButton>
        <Toaster />
      </>
    )
  }
}

export const WithTtile: Story = {
  render: () => {
    const { toast } = useToast()

    return (
      <>
        <PillButton
          onClick={() =>
            toast({
              title: 'Toast Title',
              description: 'Toast Description'
            })
          }
        >
          Toast!
        </PillButton>
        <Toaster />
      </>
    )
  }
}

export const WithAction: Story = {
  render: () => {
    const { toast } = useToast()

    return (
      <>
        <PillButton
          onClick={() =>
            toast({
              title: 'Toast Title',
              description: 'Toast Description',
              action: <ToastAction altText='Button'>Button</ToastAction>
            })
          }
        >
          Toast!
        </PillButton>
        <Toaster />
      </>
    )
  }
}

export const Destructive: Story = {
  render: () => {
    const { toast } = useToast()

    return (
      <>
        <PillButton
          onClick={() =>
            toast({
              title: 'Toast Title',
              description: 'Toast Description',
              variant: 'destructive'
            })
          }
        >
          Toast!
        </PillButton>
        <Toaster />
      </>
    )
  }
}

export const DestructiveWithAction: Story = {
  render: () => {
    const { toast } = useToast()

    return (
      <>
        <PillButton
          onClick={() =>
            toast({
              title: 'Toast Title',
              description: 'Toast Description',
              action: <ToastAction altText='Button'>Button</ToastAction>,
              variant: 'destructive'
            })
          }
        >
          Toast!
        </PillButton>
        <Toaster />
      </>
    )
  }
}
