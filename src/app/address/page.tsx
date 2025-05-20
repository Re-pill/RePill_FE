'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Locate, SearchIcon } from 'lucide-react'
import {
  PillTextInput,
  PillTextInputIcon,
  PillTextInputRoot
} from '@/components/pill-text-input'
import { PillButton } from '@/components/pill-button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/alert-dialog'

export default function AddressPage () {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  const handleRegister = () => {
    // TODO: Actually register the address
    setOpen(true)
  }

  const onClickCurrentLocation = () => {
    // TODO: Send the coordinate to server and get the actual address
    const success = (pos: GeolocationPosition) => {
      setInputValue(`${pos.coords.latitude} ${pos.coords.longitude}`)
    }
    const error = (error: unknown) => {
      console.error(error)
    }
    navigator.geolocation.getCurrentPosition(success, error, {
      timeout: 5000,
      maximumAge: 0
    })
  }

  return (
    <>
      <div className='relative h-screen'>
        <div
          className='absolute top-26 left-18 w-20 h-20 rounded-full -z-10' style={{
            background: 'radial-gradient(50% 50% at 50% 50%, #FF7447 0%, transparent 100%)'
          }}
        />

        <div className='flex flex-col h-full justify-between py-32'>
          <div className='flex flex-col gap-8'>
            <div>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold text-black'>
                  반가워요!
                </span>
                <Image
                  src='/images/logo.svg'
                  alt='Re pill logo'
                  width={28}
                  height={28}
                  priority
                />
              </div>
              <p className='text-2xl font-bold text-black'>
                가까운 수거함을 찾으려면
                <br /> 주소가 필요해요.
              </p>
            </div>

            <div>
              <PillTextInputRoot>
                <PillTextInput
                  placeholder='도로명, 건물명, 지번 입력'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <PillTextInputIcon pos='right'>
                  <SearchIcon className='w-6 h-6' />
                </PillTextInputIcon>
              </PillTextInputRoot>

              {inputValue.trim() === ''
                ? (
                  <div className='flex justify-end'>
                    <PillButton
                      variant='link'
                      size='sm'
                      className='text-xs font-medium text-orange hover:text-orange gap-1'
                      onClick={() => {
                        onClickCurrentLocation()
                      }}
                    >
                      <Locate className='w-4 h-4' />
                      현재 위치로 설정
                    </PillButton>
                  </div>
                  )
                : (
                  <div className='py-4 space-y-3 text-sm px-4'>
                    <p className='text-black font-semibold'>입력예시</p>
                    <div>
                      <p className='text-secondary font-semibold'>도로명 + 건물번호</p>
                      <p className='text-orange font-semibold'>역삼로 180</p>
                    </div>
                    <div>
                      <p className='text-secondary font-semibold'>지역명(동/리)+번지</p>
                      <p className='text-orange font-semibold'>강남구 역삼동 790-6</p>
                    </div>
                    <div>
                      <p className='text-secondary font-semibold'>지역명(동/리)+건물명</p>
                      <p className='text-orange font-semibold'>역삼동 마루 180</p>
                    </div>
                  </div>
                  )}
            </div>
          </div>

          <div>
            <PillButton
              size='full'
              onClick={handleRegister}
              className='bg-orange hover:bg-orange text-black font-bold'
              disabled={inputValue.trim() === ''}
            >
              등록하기
            </PillButton>
          </div>
        </div>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              주소 등록을 완료했어요.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
            // TODO: Move to the next page
              onClick={() => setOpen(false)}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
