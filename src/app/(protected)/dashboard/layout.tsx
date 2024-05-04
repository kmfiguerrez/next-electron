import Navbar from '@/components/dashboard/navbar/navbar'
import Sidebar from '@/components/dashboard/sidebar/sidebar'
import React from 'react'

type TDashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout: React.FC<TDashboardLayoutProps> = ({ children }) => {
  return (
    <div className='flex'>
      <div className='flex p-5'>
        <Sidebar />
      </div>
      <div className='flex p-5'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout