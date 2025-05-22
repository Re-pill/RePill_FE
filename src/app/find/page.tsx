'use client'
import { HappyFace } from '@/components/icons/happy-face'
import { BorderlessIconButton } from '@/components/ui/button/borderless-icon-button'
import { ColorfulMapMarker } from '@/components/ui/map-marker'
import { PillTextInput, PillTextInputIcon, PillTextInputRoot } from '@/components/ui/pill-text-input'
import { KAKAO_JS_KEY } from '@/constant'
import { useError } from '@/hooks/error'
import { COLORFUL_MARKER } from '@/types/map'
import { cn } from '@/utils/cn'
import { Loader2, Locate, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk'

const dummyMarkers = [
  {
    type: 'citizen',
    position: {
      lat: 37.5667892,
      lng: 126.9784204
    },
    name: '칠팀 주민센터',
    address: '서울특별시 종로구 세종대로 1길 1',
    startTime: '09:00',
    endTime: '18:00',
    phone: '02-1234-5678',
  },
  {
    type: 'health',
    position: {
      lat: 37.566338,
      lng: 126.977922
    },
    name: '서울특별시 종로구 보건소',
    address: '서울특별시 종로구 세종대로 1길 2',
    startTime: '09:00',
    endTime: '18:00',
    phone: '02-1234-5678',
  }
]

export default function FindPage () {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAO_JS_KEY as string,
    libraries: ['services'],
    url: '//dapi.kakao.com/v2/maps/sdk.js'
  })
  const { setError } = useError()
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [center, setCenter] = React.useState({
    lat: 37.5667892,
    lng: 126.9784204
  })
  const [selectedMarker, setSelectedMarker] = React.useState<string | null>(null)
  const router = useRouter()

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

  const onClickCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, (err) => {
        setError({
          title: '위치 정보 가져오기 실패',
          error: err,
          description: '위치 권한을 꺼놓았거나 위치 서비스가 꺼져있나요?'
        })
      }, {
        timeout: 5000,
        maximumAge: 0
      })
    } else {
      setError({
        title: '위치 정보 가져오기 실패',
        error: 'GeoLocation API not available',
        description: '해당 브라우저에선 위치 서비스를 제공하지 않아요.'
      })
    }
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
      <div className='absolute bottom-24 w-full p-4 flex flex-row justify-between z-50 max-w-md'>
        <BorderlessIconButton
          className='bg-background' size='lg' onClick={
            onClickCurrentLocation
          }
        >
          <Locate className='w-6 h-6' />
        </BorderlessIconButton>
        <BorderlessIconButton
          className='relative p-0 bg-background' size='lg'
          onClick={() => {
            router.push('/find/guide')
          }}
        >
          <span className='absolute text-black font-bold top-0.5 right-1 rotate-25'>?</span>
          <HappyFace
            className='w-10 h-10 p-2' style={{
              background: 'radial-gradient(50% 50% at 50% 50%, #1C1C1C 0%, transparent 100%)'
            }}
          />
        </BorderlessIconButton>
      </div>
      {selectedMarker && (() => {
        const marker = dummyMarkers.find((marker) => `${marker.position.lat}-${marker.position.lng}` === selectedMarker)
        if (!marker) return null
        return (
          <div className='absolute bottom-28 w-full p-4 z-50 max-w-md'>
            <div className='flex flex-row p-4 pt-6 border rounded-2xl bg-background gap-4'>
              <HappyFace
                className='w-16 h-16 p-4' style={{
                  background: 'radial-gradient(50% 50% at 50% 50%, #1C1C1C 0%, transparent 100%)'
                }}
              />
              <div className='flex flex-col'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                  <p className='text-base text-black font-semibold'>
                    {marker.name}
                  </p>
                  <div className={
                      cn(
                        'w-4 h-4 rounded-full border',
                        COLORFUL_MARKER[marker.type].colorClass
                      )
                    }
                  />
                </div>
                <p className='text-sm text-secondary'>
                  {marker.address}
                </p>
                <p className='text-sm text-secondary'>
                  운영시간: {marker.startTime}~{marker.endTime}
                </p>
                <p className='text-sm text-secondary'>
                  TEL: {marker.phone}
                </p>
              </div>
            </div>
          </div>
        )
      })()}
      <Map
        center={center}
        level={3}
        className='w-full h-[calc(100vh-6rem)]'
        onDragEnd={(map) => {
          const center = map.getCenter()
          setCenter({
            lat: center.getLat(),
            lng: center.getLng()
          })
        }}
        onClick={() => {
          setSelectedMarker(null)
        }}
      >
        {/* TODO: Iterate through markers provided from server */}
        {/* Also TODO: Filter the markers based on selected category */}
        {dummyMarkers.filter(
          (marker) => selectedTypes.length === 0 || selectedTypes.includes(marker.type)
        ).map((marker) => (
          <ColorfulMapMarker
            key={`${marker.position.lat}-${marker.position.lng}`}
            type={marker.type}
            position={marker.position}
            clickable
            bigger={selectedMarker === `${marker.position.lat}-${marker.position.lng}`}
            onClick={() => {
              setSelectedMarker(`${marker.position.lat}-${marker.position.lng}`)
            }}
          />
        ))}
      </Map>
    </>
  )
}
