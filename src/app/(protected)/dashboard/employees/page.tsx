"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

const EmployeesPage = () => {


  return (
    <div>
      EmployeesPage
      <Button
        onClick={async () => {
          const currentURL = await window.electronAPI.getURL()
          console.log(currentURL)
        }}
      >
        Get URL
      </Button>
    </div>
    
  )
}

export default EmployeesPage