'use client'

import React from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthProviderState {
  accessToken: string | null
  setAccessToken: (error: string | null) => void
  refreshToken: string | null
  setRefreshToken: (error: string | null) => void
}

const initialState: AuthProviderState = {
  accessToken: null,
  setAccessToken: () => null,
  refreshToken: null,
  setRefreshToken: () => null
}
export const AuthProviderContext =
  React.createContext<AuthProviderState>(initialState)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = React.useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken')
    }
    return null
  })
  const [refreshToken, setRefreshToken] = React.useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken')
    }
    return null
  })

  const value = {
    accessToken,
    setAccessToken: (accessToken: string | null) => {
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
      } else {
        localStorage.removeItem('accessToken')
      }
      setAccessToken(accessToken)
    },
    refreshToken,
    setRefreshToken: (refreshToken: string | null) => {
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      } else {
        localStorage.removeItem('refreshToken')
      }
      setRefreshToken(refreshToken)
    }
  }

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}
