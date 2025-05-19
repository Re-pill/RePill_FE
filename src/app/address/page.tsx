'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckIcon, LocationEditIcon, SearchIcon } from 'lucide-react'
import { Container } from '@/components/container'
import {
  PillTextInput,
  PillTextInputIcon,
  PillTextInputRoot
} from '@/components/pill-text-input'
import { PillButton } from '@/components/pill-button'

export default function AddressPage () {
  const [inputValue, setInputValue] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)

  const handleRegister = () => {
    if (inputValue) {
      setIsRegistered(true)
      setTimeout(() => setIsRegistered(false), 2000)
    }
  }

  return (
    <Container className='relative bg-background'>
      {/* 강조 배경 */}
      <div className='absolute top-[3.75rem] left-[5.625rem] w-[5rem] h-[5rem] rounded-full bg-[radial-gradient(ellipse_at_center,orange_0%,_transparent_70%)] z-0' />

      {/* 상단 문구 */}
      <div className='pt-20 px-6 z-10'>
        <p className='text-xl font-bold text-black leading-tight flex items-center gap-2'>
          반가워요!
          <Image
            src='/images/logo.svg'
            alt='Re pill logo'
            width={28}
            height={28}
            priority
          />
        </p>
        <p className='text-xl font-bold text-black leading-tight'>
          가까운 수거함을 찾으려면
          <br /> 주소가 필요해요.
        </p>
      </div>

      {/* 입력창 및 위치 설정 */}
      <div className='px-6 pt-8 z-10'>
        <PillTextInputRoot>
          <PillTextInput
            placeholder='도로명, 건물명, 지번 입력'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <PillTextInputIcon pos='right'>
            <SearchIcon className='text-secondary-bg-hover' />
          </PillTextInputIcon>
        </PillTextInputRoot>

        {inputValue.trim() === '' && (
          <div className='flex justify-end pt-0'>
            <PillButton
              variant='link'
              size='sm'
              className='text-xs font-medium text-orange hover:text-orange'
            >
              <LocationEditIcon className='w-3 h-3 mr-0' />
              현재 위치로 설정
            </PillButton>
          </div>
        )}

        {/* 입력 예시 (조건부 렌더링) */}
        {inputValue.trim() !== '' && (
          <div className='pt-4 space-y-3 text-sm pl-4'>
            <p className='text-black font-bold'>입력예시</p>
            <div>
              <p className='text-secondary'>도로명 + 건물번호</p>
              <p className='text-orange font-medium'>역삼로 180</p>
            </div>
            <div>
              <p className='text-secondary'>지역명(동/리)+번지</p>
              <p className='text-orange font-medium'>강남구 역삼동 790-6</p>
            </div>
            <div>
              <p className='text-secondary'>지역명(동/리)+건물명</p>
              <p className='text-orange font-medium'>역삼동 마루 180</p>
            </div>
          </div>
        )}
      </div>

      {/* 등록하기 버튼 */}
      <div className='px-6 pb-12 pt-8 z-10 mt-auto'>
        <PillButton
          size='full'
          onClick={handleRegister}
          className='bg-orange hover:bg-orange text-black font-bold'
        >
          등록하기
        </PillButton>
      </div>

      {/* 등록 완료 모달 */}
      {isRegistered && (
        <div className='absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white px-6 py-4 rounded-xl flex items-center gap-4 shadow-lg'>
            <CheckIcon className='text-primary-bg' />
            <span className='text-black font-medium'>주소 등록을 완료했어요.</span>
          </div>
        </div>
      )}
    </Container>
  )
}
