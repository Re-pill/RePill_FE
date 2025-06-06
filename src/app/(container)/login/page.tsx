'use client'

import Image from 'next/image'
import { PillButton } from '@/components/ui/button/pill-button'
import { KakaoIcon } from '@/components/icons/kakao'
import { useRouter } from 'next/navigation'

export default function LoginPage () {
  const router = useRouter()
  const handleKakaoLogin = () => {
    const redirectUri = `${window.location.origin}/auth/kakao/callback`
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=72c6c8b1e90421c20af84c1d50ab083e&state=sGZAsXVZ5DriH5KWds7UZ67-wEFR6ucH9hy0O8MNHIo%3D&redirect_uri=${redirectUri}`
    router.push(kakaoLoginUrl)
  }

  return (
    <div className='relative h-screen'>
      <div
        className='absolute w-101.5 h-101.5 top-[calc(50%-12.75rem)] -left-55 -z-10'
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, #BFFF00 0%, rgba(255, 255, 255, 0.57) 100%)'
        }}
      />
      <div className='flex flex-col py-32 items-center h-full'>
        {/* 로고 + 문구 */}
        <div className='flex grow-1 flex-col items-start justify-center w-full'>
          <Image
            src='/images/logo.svg'
            alt='Re pill logo'
            width={120}
            height={120}
            className='self-center'
            priority
          />
          <div className='w-full text-start'>
            <p className='text-3xl font-bold text-secondary leading-tight'>
              Re pill,
            </p>
            <p className='text-3xl font-bold text-secondary leading-tight'>
              환경을 Refill 하는 습관.
            </p>
          </div>
        </div>

        {/* 하단 로그인 영역 */}
        <div className='w-full flex flex-col items-center gap-2'>
          <p className='text-xs text-secondary font-normal'>
            SNS 계정으로 간편 가입하기
          </p>
          <PillButton
            variant='primary'
            size='full'
            className='bg-[#FEE500] text-black font-semibold text-sm hover:bg-[#E5CE00]'
            onClick={handleKakaoLogin}
          >
            <KakaoIcon className='w-4 h-4 mr-2' />
            카카오 로그인
          </PillButton>
        </div>
      </div>
    </div>
  )
}
