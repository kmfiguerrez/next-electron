"use client"


import React from 'react'

import Navbar from '@/components/dashboard/navbar/navbar'
import Sidebar from '@/components/dashboard/sidebar/sidebar'

import EmployeesProvider from "@/components/providers/employees-context"

type TDashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout: React.FC<TDashboardLayoutProps> = ({ children }) => {
  return (
    <div className='flex'>
      <div className='p-5 bg-zinc-900 min-h-screen w-[300px]'>
        <Sidebar />
      </div>
      <div className='p-5'>
        <Navbar />
        <EmployeesProvider>
          {children}
        </EmployeesProvider>        
      </div>
    </div>
  )
}

export default DashboardLayout