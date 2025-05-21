'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Container } from '@/components/ui/container'

export default function OnboardingPage () {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 2000) // 2초 후 로그인 페이지로 이동
    return () => clearTimeout(timer)
  }, [router])

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
