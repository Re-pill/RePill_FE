import type { Meta, StoryObj } from '@storybook/react'

import { Container } from './container'
import { PillButton } from './pill-button'

const meta: Meta<typeof Container> = {
  component: Container
}

export default meta
type Story = StoryObj<typeof Container>

export const Single: Story = {
  render: () => (
    <Container>
      <PillButton size='full'>Button</PillButton>
    </Container>
  )
}
