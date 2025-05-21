export const COLORFUL_MARKER: {
  [key: string]: {
    src: string
    name: string
  }
} = {
  health: { src: '/images/markers/health-center.svg', name: '보건소' },
  citizen: { src: '/images/markers/citizen-center.svg', name: '주민센터' },
  welfare: { src: '/images/markers/welfare-center.svg', name: '복지관' },
  office: { src: '/images/markers/city-office.svg', name: '구청' },
  etc: { src: '/images/markers/etc.svg', name: '기타' },
} as const

export type ColorfulMarkerType = keyof typeof COLORFUL_MARKER
