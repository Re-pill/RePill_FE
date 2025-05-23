import React from 'react'
import { AuthProviderContext } from '@/components/contexts/auth-provider'

export const useAuth = () => {
  const context = React.useContext(AuthProviderContext)

  if (context === undefined) { throw new Error('useAuth must be used within a TokenProvider') }

  return context
}
