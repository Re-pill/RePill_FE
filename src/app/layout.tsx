import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ErrorProvider } from '@/components/contexts/error-provider'
import { AuthProvider } from '@/components/contexts/auth-provider'

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
})

export const metadata: Metadata = {
  title: 'Re pill',
  description: '환경을 Refill 하는 습관.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${pretendard.variable} antialiased`}>
        <ErrorProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  )
}
