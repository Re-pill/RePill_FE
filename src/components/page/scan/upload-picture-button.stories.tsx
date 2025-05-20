/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'

import { PictureUploadButton as PictureUploadButtonComp } from './upload-picture-button'
import React from 'react'

const meta: Meta<typeof PictureUploadButtonComp> = {
  component: PictureUploadButtonComp
}

export default meta
type Story = StoryObj<typeof PictureUploadButtonComp>

export const PictureUploadButton: Story = {
  render: () => {
    const [image, setImage] = React.useState<File | null>(null)

    return (
      <PictureUploadButtonComp
        image={image}
        onImageChange={(file) => setImage(file)}
      />
    )
  }
}
