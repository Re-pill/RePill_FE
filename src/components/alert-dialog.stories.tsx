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

export const Simple: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PillButton>Open</PillButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
