import { Sidebar } from '@/components/sidebar'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Sidebar className='hidden lg:flex' />
      <main className='lg:pl-[250px]  h-full'>
        <div className='bg-red-500'>{children}</div>
      </main>
    </>
  )
}

export default MainLayout
