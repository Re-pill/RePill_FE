import '../src/app/globals.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'background',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#000000'
        },
        {
          name: 'background',
          value: '#D9D9D9'
        }
      ]
    }
  }
}

export default preview
