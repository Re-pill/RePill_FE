import { BottomNav } from '@/components/page/bottom-nav'

export default function AddLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='pb-32 flex flex-col'>{children}</div>
      <BottomNav />
    </>
  )
}
