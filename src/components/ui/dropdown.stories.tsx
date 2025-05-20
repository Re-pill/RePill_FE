/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'

import {
  DropdownMenu as DropdownMenuComp,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from './dropdown'
import { PillButton } from './button/pill-button'
import React from 'react'

const meta: Meta<typeof DropdownMenuComp> = {
  component: DropdownMenuComp
}

export default meta
type Story = StoryObj<typeof DropdownMenuComp>

export const DropdownMenu: Story = {
  render: () => (
    <DropdownMenuComp>
      <DropdownMenuTrigger asChild className='focus:outline-none'>
        <PillButton size='full' variant='ghost' className='relative z-[51] bg-background'>Open</PillButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='dropdown-content-width-full pt-7.5 rounded-t-none' sideOffset={-26} side='top'>
        <DropdownMenuLabel>Label</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuComp>
  )
}

export const RadioDropdownMenu: Story = {
  render: () => {
    const [value, setValue] = React.useState('item1')
    return (
      <DropdownMenuComp>
        <DropdownMenuTrigger asChild className='focus:outline-none'>
          <PillButton size='full' variant='ghost' className='relative z-[51] bg-background'>{value}</PillButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='dropdown-content-width-full pt-7.5 rounded-t-none' sideOffset={-26} side='top'>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            <DropdownMenuRadioItem value='item1'>Item 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='item2'>Item 2</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='item3'>Item 3</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenuComp>
    )
  }
}
