'use client'
import React from 'react'
import Markdown from 'react-markdown'
import { PillButton } from '@/components/ui/button/pill-button'
import { PillTypes } from '@/types/pill'
import { cn } from '@/utils/cn'
import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea'
import { Label } from '@/components/ui/label'
import { HappyFace } from '@/components/icons/happy-face'
import { BorderlessIconButton } from '@/components/ui/button/borderless-icon-button'
import { ChevronLeft } from 'lucide-react'

export default function GuidePage () {
  const [selectedType, setSelectedTypes] = React.useState<keyof typeof PillTypes>('pill')

  return (
    <>
      <div className='relative'>
        <div className='absolute top-4 -left-4'>
          <BorderlessIconButton
            size='lg'
            onClick={() => {
              window.history.back()
            }}
          >
            <ChevronLeft className='h-6 w-6' />
          </BorderlessIconButton>
        </div>
        <div
          className='absolute top-9 left-68 rounded-full w-24 h-24 -z-10'
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, #BFFF00 0%, transparent 100%)'
          }}
        />
      </div>
      <span className='text-2xl font-bold pt-20'>
        종류에 따라 폐기 방법이 달라져요!
      </span>
      <span className='text-2xl font-bold pb-12'>
        폐기 방법 알려드릴게요.
      </span>
      <Label className='pb-4'>종류</Label>
      <ScrollArea className='w-full'>
        <div className='flex w-max space-x-4'>
          {Object.entries(PillTypes).map(([key, value]) => (
            <PillButton
              key={key}
              variant='ghost'
              className={cn(
                'gap-6 text-black',
                selectedType === key && value.buttonClass
              )}
              onClick={(e) => {
                e.preventDefault()
                setSelectedTypes(key)
              }}
            >
              <value.ShapeComp />
              {value.label}
            </PillButton>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <div className='relative rounded-2xl w-full p-8 pt-12 mt-16 bg-secondary-bg'>
        <div
          className='absolute -top-8 left-4 h-16 w-16 rounded-full flex items-center justify-center' style={{
            background: 'radial-gradient(50% 50% at 50% 50%, #1C1C1C 0%, #575758 33.6%, #E1E3E6 85.58%)'
          }}
        >
          <HappyFace className='h-9 w-9' eyeColor={PillTypes[selectedType].color} />
        </div>
        <Markdown>
          {PillTypes[selectedType].discardTutorial}
        </Markdown>
      </div>
    </>
  )
}
