'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function OnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 2000) // 2초 후 로그인 페이지로 이동
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="w-[390px] h-[844px] bg-[var(--color-background)] flex items-center justify-center mx-auto">
      <Image
        src="/images/logo.svg"
        alt="Re pill logo"
        width={120}
        height={120}
        priority
      />
    </div>
  )
}