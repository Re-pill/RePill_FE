import type { Meta, StoryObj } from '@storybook/react'

import { Container as ContainerComp } from './container'
import { PillButton } from './button/pill-button'

const meta: Meta<typeof ContainerComp> = {
  component: ContainerComp
}

export default meta
type Story = StoryObj<typeof ContainerComp>

export const Container: Story = {
  render: () => (
    <ContainerComp>
      <PillButton size='full'>Button</PillButton>
    </ContainerComp>
  )
}
