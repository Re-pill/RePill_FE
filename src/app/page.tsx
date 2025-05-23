'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { useAuth } from '@/hooks/use-auth'

export default function OnboardingPage () {
  const router = useRouter()
  const { accessToken } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(accessToken ? '/find' : '/login')
    }, 2000)
    return () => clearTimeout(timer)
  }, [router, accessToken])

  return (
    <Container className='items-center justify-center'>
      <Image
        src='/images/logo.svg'
        alt='Re pill logo'
        width={120}
        height={120}
        priority
      />
    </Container>
  )
}
