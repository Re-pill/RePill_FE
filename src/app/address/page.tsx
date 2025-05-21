'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Locate, SearchIcon } from 'lucide-react'
import {
  PillTextInput,
  PillTextInputIcon,
  PillTextInputRoot
} from '@/components/ui/pill-text-input'
import { PillButton } from '@/components/ui/button/pill-button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog'
import { useError } from '@/hooks/error'
import { KAKAO_MAP_API_URL, type CoordToAddressResponse } from '@/types/kakao/map'
import { KAKAO_REST_API_KEY } from '@/constant'

export default function AddressPage () {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const { setError } = useError()

  const handleRegister = () => {
    // TODO: Actually register the address
    setOpen(true)
  }

  const onClickCurrentLocation = () => {
    // TODO: Send the coordinate to server and get the actual address
    const success = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords
      const res = await fetch(`${KAKAO_MAP_API_URL}/geo/coord2address?x=${longitude}&y=${latitude}`, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`
        }
      })
      if (!res.ok) {
        setError({
          title: '위치 정보를 가져올 수 없어요.',
          error: new Error('Failed to fetch address'),
        })
        return
      }
      const data: CoordToAddressResponse = await res.json()
      if (data.documents.length === 0) {
        setError({
          title: '현재 위치를 찾을 수 없어요.',
          error: new Error('No address found'),
        })
        return
      }

      const address = data.documents[0].address.address_name
      setInputValue(address)
    }
    const error = (error: unknown) => {
      setError({
        title: '위치 정보를 가져올 수 없어요.',
        error,
        description: '위치 정보 접근을 허용해주세요.'
      })
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
            background: 'radial-gradient(50% 50% at 50% 50%, var(--color-orange) 0%, transparent 100%)'
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
                <PillTextInputIcon pos='right'>
                  <SearchIcon className='w-6 h-6' />
                </PillTextInputIcon>
                <PillTextInput
                  placeholder='도로명, 건물명, 지번 입력'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
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
