import type { Meta, StoryObj } from '@storybook/react'

import { Tabs as TabsComp, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta: Meta<typeof TabsComp> = {
  component: TabsComp,
  subcomponents: {
    TabsList,
    TabsTrigger,
    TabsContent
  },
}

export default meta
type Story = StoryObj<typeof TabsComp>

export const Container: Story = {
  render: () => (
    <TabsComp defaultValue='account' className='w-[400px]'>
      <TabsList className='w-full grid grid-cols-2'>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>Make changes to your account here.</TabsContent>
      <TabsContent value='password'>Change your password here.</TabsContent>
    </TabsComp>
  )
}
