import { BottomNav } from '@/components/page/bottom-nav'
import { Container } from '@/components/ui/container'

export default function FindLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Container className='p-0'>
        <div className='flex flex-col'>{children}</div>
        <BottomNav />
      </Container>
    </>
  )
}
