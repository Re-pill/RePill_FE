import { Container } from '@/components/ui/container'

export default function ContainerLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container>{children}</Container>
  )
}
