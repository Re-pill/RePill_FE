import React from 'react'
import { ErrorProviderContext } from '@/components/contexts/error-provider'

export const useError = () => {
  const context = React.useContext(ErrorProviderContext)

  if (context === undefined) { throw new Error('useError must be used within a ErrorProvider') }

  return context
}
