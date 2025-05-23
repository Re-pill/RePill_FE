import { BottomNav } from '@/components/page/bottom-nav'

export default function ScanLayout ({
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
