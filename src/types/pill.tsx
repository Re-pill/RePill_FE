import { cn } from '@/utils/cn'
import { Triangle } from 'lucide-react'
import Image from 'next/image'

export const PillTypes: {
  [key: string]: {
    label: string
    buttonClass: string
    ShapeComp: React.ComponentType<{ className?: string }>
    color: string
    discardTutorial: string
  }
} = {
  pill: {
    label: '알약',
    buttonClass: 'border-[#BFFF00] hover:bg-[#BFFF00]/80 hover:text-black',
    ShapeComp: ({ className }) => (<div className={
        cn(
          'bg-[#BFFF00] w-6 h-6 rounded-full',
          className
        )
      }
                                   />),
    color: '#BFFF00',
    discardTutorial: `💊 **알약 / 캡슐**

-포장(PTP, 병 등)에서 꺼내서 버려요.

-종이컵, 봉지 등에 따로 모아서 수거함에 넣어요.
\n &nbsp;

⛔ 포장 그대로 버리면 분리배출 어려워요!`
  },
  powder: {
    label: '가루약',
    buttonClass: 'border-[#055FF1] hover:bg-[#055FF1]/80',
    ShapeComp: ({ className }) => (
      <Triangle
        className={
        cn(
          'w-6 h-6',
          className
        )
      } fill='#055FF1' strokeWidth={0}
      />
    ),
    color: '#055FF1',
    discardTutorial: `🧂 **가루약**
    
-봉지에서 꺼내지 마세요.

-그대로 종이봉지나 비닐봉지 채로 모아서 폐의약품 수거함에 버려요.
\n &nbsp;

⛔️가루약은 내용물이 흩어지기 쉬우므로 포장을 절대 뜯지 마세요!`
  },
  liquid: {
    label: '물약(시럽)',
    buttonClass: 'border-orange hover:bg-orange/80',
    ShapeComp: ({ className }) => (<div className={
      cn(
        'bg-orange w-6 h-6 rounded-md',
        className
      )
    }
                                   />),
    color: '#FF7447',
    discardTutorial: `💧 **물약/시럽**

-절대 변기에 버리지 마세요.

-뚜껑 닫은 채 그대로 수거함에 넣어요.
\n &nbsp;

⛔ 쏟을 위험이 있으니 밀폐해서 담기 추천!`
  },
  etc: {
    label: '기타',
    buttonClass: 'border-[#FF35BC] hover:bg-[#FF35BC]/80',
    ShapeComp: ({ className }) => (
      <Image src='/images/etc-pill-type.svg' alt='' width={24} height={24} className={className} />
    ),
    color: '#FF35BC',
    discardTutorial: `💉 **주사제/ 앰플 / 주사기**

-주사기는 그대로 병원이나 약국에 반납해요.

-날카로운 주사침은 꼭 뚜껑 닫아 안전하게 처리
\n &nbsp;

⛔ 일반 수거함에는 절대 버리지 말기!(위험물)
\n &nbsp;

🧴 **연고 / 크림**

-뚜껑 닫고 튜브 그대로 수거함에 넣기

-다 쓴 연고도 폐의약품이에요!`
  }
}

export interface Pill {
  id: number
  name: string
  type: keyof typeof PillTypes
  expirationDate: Date
}
