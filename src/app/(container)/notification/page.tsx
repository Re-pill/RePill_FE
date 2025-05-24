'use client'

import { useRouter } from 'next/navigation'
import { PillStore, usePillStore } from '@/stores/pillStore'
import { Container } from '@/components/ui/container'
import { NotificationCard } from '@/components/page/notifications/notificationCard'

export default function NotificationPage () {
  const router = useRouter()

  const pills = usePillStore((state: PillStore) => state.pills)
  const setActive = usePillStore((state: PillStore) => state.setActive)

  const handleCardClick = (id: number) => {
    setActive(id, true)
    router.push(`/notification/${id}/edit`)
  }

  return (
    <div className='relative'>
      {/* 상단 배경 장식 */}
      <div
        className='absolute top-8 left-60 rounded-full w-24 h-24 -z-10'
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #F85D96 0%, transparent 100%)',
        }}
      />
      <Container className='pt-24 pb-4'>
        {/* 타이틀 */}
        <h1 className='text-2xl font-bold mb-14 text-left'>
          폐기까지 남은 기간을 확인해 보세요!
        </h1>

        {/* 알림 카드 리스트 */}
        <div className='space-y-4'>
          {pills.map((pill) => (
            <NotificationCard
              key={pill.id}
              name={pill.name}
              type={pill.type}
              daysLeft={pill.notifyBefore[0] ?? 0}
              expirationDate={pill.expirationDate}
              isActive={pill.isActive}
              onClick={() => handleCardClick(pill.id)}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
