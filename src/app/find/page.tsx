'use client'
import { ColorfulMapMarker } from '@/components/ui/map-marker'
import { PillTextInput, PillTextInputIcon, PillTextInputRoot } from '@/components/ui/pill-text-input'
import { KAKAO_JS_KEY } from '@/constant'
import { useError } from '@/hooks/error'
import { COLORFUL_MARKER } from '@/types/map'
import { cn } from '@/utils/cn'
import { Loader2, Search } from 'lucide-react'
import React from 'react'
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk'

export default function FindPage () {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAO_JS_KEY as string,
    libraries: ['services'],
    url: 'http://dapi.kakao.com/v2/maps/sdk.js'
  })
  const { setError } = useError()
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [center, setCenter] = React.useState({
    lat: 37.5667892,
    lng: 126.9784204
  })

  React.useEffect(() => {
    if (error) {
      setError({
        title: '카카오 맵 로딩 실패',
        error
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const handleSearch = (keyword: string) => {
    if (keyword.length < 1) {
      return
    }

    const places = new kakao.maps.services.Places()
    places.keywordSearch(
      keyword,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setCenter({ lat: Number(result[0].y), lng: Number(result[0].x) })
        } else {
          setError({
            title: '장소 검색 실패',
            error: status
          })
        }
      },
      {
        useMapCenter: true
      }
    )
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-[calc(100vh-6rem)]'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  return (
    <>
      <div className='absolute max-w-md p-4 top-8 gap-2 flex flex-col w-full z-50'>
        <PillTextInputRoot>
          <PillTextInputIcon pos='right'>
            <Search className='w-6 h-6' />
          </PillTextInputIcon>
          <PillTextInput
            className='bg-background'
            placeholder='우리 동네 폐의약품 수거함 찾아보기' onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch(e.currentTarget.value)
              }
            }}
          />
        </PillTextInputRoot>
        <div className='items-center justify-center rounded-full p-1 border-2 gap-1 border-secondary text-black bg-background w-full grid grid-cols-5'>
          {Object.entries(COLORFUL_MARKER).map(([type, marker]) => (
            <button
              key={type}
              className={
                cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-base font-bold bg-background ring-offset-background transition-all hover:cursor-pointer',
                  selectedTypes.includes(type) && 'bg-black text-white'
                )
              }
              onClick={() => {
                if (selectedTypes.includes(type)) {
                  setSelectedTypes((prev) => prev.filter((t) => t !== type))
                } else {
                  setSelectedTypes((prev) => [...prev, type])
                }
              }}
            >
              {marker.name}
            </button>
          ))}
        </div>
      </div>
      <Map
        center={center}
        level={3}
        className='w-full h-[calc(100vh-6rem)]'
      >
        <ColorfulMapMarker type='citizen' position={{ lat: 37.5667892, lng: 126.9784204 }} clickable />
      </Map>
    </>
  )
}
