export const COLORFUL_MARKER: {
  [key: string]: {
    src: string
    name: string
    colorClass: string
  }
} = {
  health: {
    src: '/images/markers/health-center.svg',
    name: '보건소',
    colorClass: 'bg-[#BFFF00]'
  },
  citizen: {
    src: '/images/markers/citizen-center.svg',
    name: '주민센터',
    colorClass: 'bg-[#FF7447]'
  },
  welfare: {
    src: '/images/markers/welfare-center.svg',
    name: '복지관',
    colorClass: 'bg-[#3261D7]'
  },
  office: {
    src: '/images/markers/city-office.svg',
    name: '구청',
    colorClass: 'bg-[#F85D96]'
  },
  etc: {
    src: '/images/markers/etc.svg',
    name: '기타',
    colorClass: 'bg-[#8E8E8E]'
  },
} as const

export type ColorfulMarkerType = keyof typeof COLORFUL_MARKER
