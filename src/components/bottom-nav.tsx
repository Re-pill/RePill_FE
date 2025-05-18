import Link from 'next/link'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'
import {
  Search,
  PlusCircle,
  Bell,
  UserCircle,
  Scan,
  type LucideProps
} from 'lucide-react'
import { Container } from './container'

const navItems: {
  label: string
  Icon: React.FC<LucideProps>
  href: string
}[] = [
  {
    label: '찾기',
    Icon: Search,
    href: '/find'
  },
  {
    label: '등록',
    Icon: PlusCircle,
    href: '/pills/add'
  },
  {
    label: '스캔',
    Icon: Scan,
    href: '/scan'
  },
  {
    label: '알림',
    Icon: Bell,
    href: '/notification'
  },
  {
    label: 'MY',
    Icon: UserCircle,
    href: '/me'
  }
]

export function BottomNav({ selected }: { selected?: string }) {
  const pathname = selected ?? usePathname()

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50'>
      <Container className='min-h-max flex flex-row items-center justify-around p-4 bg-[#1D1F24]'>
        {navItems.map((item, index) => {
          if (index === 2) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'relative -top-11 h-16 w-16 border-solid border-4 border-[#1D1F24] flex flex-col gap-2 items-center justify-center rounded-full transition-colors text-secondary-bg-hover bg-secondary-bg hover:bg-[#ACE500]',
                  pathname === item.href && 'bg-primary-bg'
                )}
              >
                <item.Icon className='h-6 w-6' />
              </Link>
            )
          } else {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'h-15.5 w-15.5 p-2 flex flex-col gap-2 items-center justify-center rounded-full transition-colors text-secondary-bg-hover hover:bg-secondary-bg-hover/20',
                  pathname === item.href && 'text-primary-bg'
                )}
              >
                <item.Icon className='h-6 w-6' />
                <span className='text-xs font-semibold'>{item.label}</span>
              </Link>
            )
          }
        })}
      </Container>
    </nav>
  )
}
