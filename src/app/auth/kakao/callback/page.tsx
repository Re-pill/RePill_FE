'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useError } from '@/hooks/error'
import { fetchClient } from '@/utils/fetch-client'

export default function KakaoCallbackPage () {
  const { setAccessToken, setRefreshToken } = useAuth()
  const { setError } = useError()
  const router = useRouter()

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) {
      router.push('/login')
      return
    }

    const requestToken = async () => {
      const { data, error } = await fetchClient.GET('/api/auth/login/kakao', {
        params: {
          query: {
            code
          }
        }
      })

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          setError({
            title: '카카오 로그인 실패',
            error
          })
        } else {
          router.push('/login')
        }
      }

      if (data) {
        if (data.isSuccess && data.result) {
          setAccessToken(data.result.accessToken!)
          setRefreshToken(data.result.refreshToken!)
          router.push('/')
        } else {
          if (process.env.NODE_ENV === 'development') {
            setError({
              title: '카카오 로그인 실패',
              error: data
            })
          } else {
            router.push('/login')
          }
        }
      }
    }
    requestToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
