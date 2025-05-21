'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog'

interface ErrorContext {
  title: string
  description?: string
  error: unknown
}

interface ErrorProviderProps {
  children: React.ReactNode
}

interface ErrorProviderState {
  error: ErrorContext | null
  setError: (error: ErrorContext | null) => void
}

const initialState: ErrorProviderState = {
  error: null,
  setError: () => null
}
export const ErrorProviderContext =
  React.createContext<ErrorProviderState>(initialState)

export function ErrorProvider ({ children }: ErrorProviderProps) {
  const [error, setError] = React.useState<ErrorContext | null>(null)

  const value = {
    error,
    setError: (error: ErrorContext | null) => {
      if (error) {
        console.error(error.error)
      }
      setError(error)
    }
  }

  return (
    <ErrorProviderContext.Provider value={value}>
      {children}
      {error && (
        <AlertDialog open onOpenChange={() => setError(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{error.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {error.description ?? '잠시 후 다시 시도해주세요.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setError(null)}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ErrorProviderContext.Provider>
  )
}
