import { MobileHeader } from '@/components/mobile-header'
import { Sidebar } from '@/components/sidebar'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className='hidden lg:flex' />
      <main className='lg:pl-[250px]  h-full pt-[50px] lg:pt-0'>
        <div className='bg-red-500'>{children}</div>
      </main>
    </>
  )
}

export default MainLayout
