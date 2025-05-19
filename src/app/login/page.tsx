'use client'

import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="w-[390px] h-[844px] bg-[var(--color-background)] mx-auto flex flex-col justify-between relative">
      {/* 그라데이션 배경 */}
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary-bg)_0%,_transparent_70%)] top-[180px] left-[-150px] z-0" />

      {/* 로고 + 문구 */}
      <div className="pt-[240px] flex flex-col items-center gap-2 z-10">
        {/* 로고: 가운데 정렬 */}
        <Image
          src="/images/logo.svg"
          alt="Re pill logo"
          width={120}
          height={120}
          priority
        />

        {/* 문구: 왼쪽 정렬 */}
        <div className="w-full px-6 text-start">
          <p className="text-[32px] font-bold text-secondary leading-tight">
            Re pill,
          </p>
          <p className="text-[32px] font-bold text-secondary leading-tight">
            환경을 Refill 하는 습관.
          </p>
        </div>
      </div>

      {/* 하단 로그인 영역 */}
      <div className="px-6 pb-28 flex flex-col items-center gap-2 z-10">
        <p className="text-[12px] text-secondary font-normal">
          SNS 계정으로 간편 가입하기
        </p>
        <button className="w-full h-[56px] bg-[#FEE500] rounded-full flex items-center justify-center gap-2 font-semibold text-sm text-black">
          <span className="text-xl">💬</span>
          카카오 로그인
        </button>
      </div>
    </div>
  )
}
