'use client'

import Image from 'next/image'
import { Container } from '@/components/container'
import { PillButton } from '@/components/pill-button'

export default function LoginPage () {
  return (
    <Container className='justify-between relative bg-background'>
      {/* 그라데이션 배경 */}
      <div className='absolute w-[25rem] h-[25rem] bg-[radial-gradient(ellipse_at_center,_var(--color-primary-bg)_0%,_transparent_70%)] top-[11.25rem] left-[-9.375rem] z-0' />

      {/* 로고 + 문구 */}
      <div className='pt-[15rem] flex flex-col items-center gap-2 z-10'>
        <Image
          src='/images/logo.svg'
          alt='Re pill logo'
          width={120}
          height={120}
          priority
        />
        <div className='w-full px-6 text-start'>
          <p className='text-3xl font-bold text-secondary leading-tight'>
            Re pill,
          </p>
          <p className='text-3xl font-bold text-secondary leading-tight'>
            환경을 Refill 하는 습관.
          </p>
        </div>
      </div>

      {/* 하단 로그인 영역 */}
      <div className='px-6 pb-28 flex flex-col items-center gap-2 z-10'>
        <p className='text-xs text-secondary font-normal'>
          SNS 계정으로 간편 가입하기
        </p>
        <PillButton
          variant='primary'
          size='full'
          className='bg-[#FEE500] text-black font-semibold text-sm'
        >
          {/* TODO: 카카오 로고 사용 */}
          <span className='text-xl'>💬</span>
          카카오 로그인
        </PillButton>
      </div>
    </Container>
  )
}
