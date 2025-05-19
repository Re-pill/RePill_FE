'use client'

import Link from 'next/link'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'
import { Search, PlusCircle, Bell, UserCircle } from 'lucide-react'
import { Container } from './container'

const navItems: {
  label: string
  Icon: React.FC<React.ComponentPropsWithoutRef<'svg'>>
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
    href: '/add'
  },
  {
    label: '스캔',
    Icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <path
          d='M2.77 10C2.34 10 2 9.66 2 9.23V6.92C2 4.21 4.21 2 6.92 2H9.23C9.66 2 10 2.34 10 2.77C10 3.2 9.66 3.54 9.23 3.54H6.92C5.05 3.54 3.54 5.06 3.54 6.92V9.23C3.54 9.66 3.19 10 2.77 10Z'
          fill='#8E8E8E'
        />
        <path
          d='M21.23 10C20.81 10 20.46 9.66 20.46 9.23V6.92C20.46 5.05 18.94 3.54 17.08 3.54H14.77C14.34 3.54 14 3.19 14 2.77C14 2.35 14.34 2 14.77 2H17.08C19.79 2 22 4.21 22 6.92V9.23C22 9.66 21.66 10 21.23 10Z'
          fill='#8E8E8E'
        />
        <path
          d='M17.0799 21.9999H15.6899C15.2699 21.9999 14.9199 21.6599 14.9199 21.2299C14.9199 20.8099 15.2599 20.4599 15.6899 20.4599H17.0799C18.9499 20.4599 20.4599 18.9399 20.4599 17.0799V15.6999C20.4599 15.2799 20.7999 14.9299 21.2299 14.9299C21.6499 14.9299 21.9999 15.2699 21.9999 15.6999V17.0799C21.9999 19.7899 19.7899 21.9999 17.0799 21.9999Z'
          fill='#8E8E8E'
        />
        <path
          d='M9.23 22H6.92C4.21 22 2 19.79 2 17.08V14.77C2 14.34 2.34 14 2.77 14C3.2 14 3.54 14.34 3.54 14.77V17.08C3.54 18.95 5.06 20.46 6.92 20.46H9.23C9.65 20.46 10 20.8 10 21.23C10 21.66 9.66 22 9.23 22Z'
          fill='#8E8E8E'
        />
        <path
          d='M18.46 11.23H17.1H6.90002H5.54002C5.11002 11.23 4.77002 11.58 4.77002 12C4.77002 12.42 5.11002 12.77 5.54002 12.77H6.90002H17.1H18.46C18.89 12.77 19.23 12.42 19.23 12C19.23 11.58 18.89 11.23 18.46 11.23Z'
          fill='#8E8E8E'
        />
        <path
          d='M6.8999 13.94V14.27C6.8999 15.93 8.2399 17.27 9.8999 17.27H14.0999C15.7599 17.27 17.0999 15.93 17.0999 14.27V13.94C17.0999 13.82 17.0099 13.73 16.8899 13.73H7.1099C6.9899 13.73 6.8999 13.82 6.8999 13.94Z'
          fill='#8E8E8E'
        />
        <path
          d='M6.8999 10.06V9.72998C6.8999 8.06998 8.2399 6.72998 9.8999 6.72998H14.0999C15.7599 6.72998 17.0999 8.06998 17.0999 9.72998V10.06C17.0999 10.18 17.0099 10.27 16.8899 10.27H7.1099C6.9899 10.27 6.8999 10.18 6.8999 10.06Z'
          fill='#8E8E8E'
        />
      </svg>
    ),
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
