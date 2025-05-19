import { Triangle } from 'lucide-react'
import Image from 'next/image'

export const PillTypes: {
  [key: string]: {
    label: string
    buttonClass: string
    ShapeComp: React.ComponentType
  }
} = {
  pill: {
    label: '알약',
    buttonClass: 'border-[#BFFF00] hover:bg-[#BFFF00]/80 hover:text-black',
    ShapeComp: () => <div className='bg-[#BFFF00] w-6 h-6 rounded-full' />
  },
  powder: {
    label: '가루약',
    buttonClass: 'border-[#055FF1] hover:bg-[#055FF1]/80',
    ShapeComp: () => (
      <Triangle className='w-6 h-6' fill='#055FF1' strokeWidth={0} />
    )
  },
  liquid: {
    label: '물약(시럽)',
    buttonClass: 'border-[#FF7447] hover:bg-[#FF7447]/80',
    ShapeComp: () => <div className='bg-[#FF7447] w-6 h-6 rounded-md' />
  },
  etc: {
    label: '기타',
    buttonClass: 'border-[#FF35BC] hover:bg-[#FF35BC]/80',
    ShapeComp: () => (
      <Image src='/images/etc-pill-type.svg' alt='' width={24} height={24} />
    )
  }
}
