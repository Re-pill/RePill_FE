import type { Meta, StoryObj } from '@storybook/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog'
import { PillButton } from './pill-button'

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  subcomponents: {
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
  }
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const HappyFace: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PillButton>Open</PillButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const SadFace: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PillButton>Open</PillButton>
      </AlertDialogTrigger>
      <AlertDialogContent sadFace>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
