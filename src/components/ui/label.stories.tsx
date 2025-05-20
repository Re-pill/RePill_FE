import type { Meta, StoryObj } from '@storybook/react'

import { Label as LabelComp } from './label'
import { PillButton } from './button/pill-button'

const meta: Meta<typeof LabelComp> = {
  component: LabelComp
}

export default meta
type Story = StoryObj<typeof LabelComp>

export const Label: Story = {
  args: {
    children: 'Label'
  },
  render: ({ children }) => (
    <>
      <LabelComp>{children}</LabelComp>
      <PillButton>Button</PillButton>
    </>
  )
}
