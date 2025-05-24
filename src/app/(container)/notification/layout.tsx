import { ReactNode } from 'react'
import { BottomNav } from '@/components/page/bottom-nav'

export default function NotificationLayout ({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <div className='pb-32'>{children}</div>
      <BottomNav selected='/notification' />
    </>
  )
}
