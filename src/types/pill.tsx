import { cn } from '@/utils/cn'
import { Triangle } from 'lucide-react'
import Image from 'next/image'

export const PillTypes: {
  [key: string]: {
    label: string
    buttonClass: string
    ShapeComp: React.ComponentType<{ className?: string }>
  }
} = {
  pill: {
    label: '알약',
    buttonClass: 'border-[#BFFF00] hover:bg-[#BFFF00]/80 hover:text-black',
    ShapeComp: ({ className }) => <div className={
      cn(
        'bg-[#BFFF00] w-6 h-6 rounded-full',
        className
      )
    }
                                  />
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
    )
  },
  liquid: {
    label: '물약(시럽)',
    buttonClass: 'border-orange hover:bg-orange/80',
    ShapeComp: ({ className }) => <div className={
      cn(
        'bg-orange w-6 h-6 rounded-md',
        className
      )
    }
                                  />
  },
  etc: {
    label: '기타',
    buttonClass: 'border-[#FF35BC] hover:bg-[#FF35BC]/80',
    ShapeComp: ({ className }) => (
      <Image src='/images/etc-pill-type.svg' alt='' width={24} height={24} className={className} />
    )
  }
}

export interface Pill {
  id: number
  name: string
  type: keyof typeof PillTypes
  expirationDate: Date
}
