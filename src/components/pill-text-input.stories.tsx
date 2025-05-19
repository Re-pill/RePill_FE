import type { Meta, StoryObj } from '@storybook/react'
import {
  PillTextInput,
  PillTextInputIcon,
  PillTextInputRoot,
  PillTextInputRootProps
} from './pill-text-input'
import { Search } from 'lucide-react'

const meta: Meta<typeof PillTextInputRoot> = {
  component: PillTextInputRoot,
  subcomponents: {
    PillTextInputIcon,
    PillTextInput
  }
}

export default meta
type Story = StoryObj<typeof PillTextInputRoot>

export const TextInputWithIcon: Story & {
  args: {
    pos?: 'left' | 'right'
    placeholder?: string
  }
  argTypes: {
    pos: {
      options: ['left', 'right']
      control: { type: 'select' }
    }
  }
} = {
  args: {
    placeholder: 'Search...',
    pos: 'left'
  },
  render: ({
    pos,
    placeholder
  }: PillTextInputRootProps & {
    pos?: 'left' | 'right'
    placeholder?: string
  }) => (
    <PillTextInputRoot>
      <PillTextInputIcon pos={pos}>
        <Search className='w-6 h-6' />
      </PillTextInputIcon>
      <PillTextInput placeholder={placeholder} />
    </PillTextInputRoot>
  ),
  argTypes: {
    pos: {
      options: ['left', 'right'],
      control: { type: 'select' }
    }
  }
}

export const TextInputWithoutIcon: Story & {
  args: {
    placeholder?: string
  }
} = {
  args: {
    placeholder: 'Search...'
  },
  render: ({
    placeholder
  }: PillTextInputRootProps & { placeholder?: string }) => (
    <PillTextInputRoot>
      <PillTextInput placeholder={placeholder} />
    </PillTextInputRoot>
  )
}
