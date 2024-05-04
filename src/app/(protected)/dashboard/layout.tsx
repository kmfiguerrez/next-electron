import Navbar from '@/components/dashboard/navbar/navbar'
import Sidebar from '@/components/dashboard/sidebar/sidebar'
import React from 'react'

type TDashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout: React.FC<TDashboardLayoutProps> = ({ children }) => {
  return (
    <div className='flex'>
      <div className='p-5 flex-1 bg-zinc-900 min-h-screen'>
        <Sidebar />
      </div>
      <div className='p-5'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout