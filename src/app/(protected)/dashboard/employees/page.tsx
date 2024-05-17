"use client"

import { useEffect, useState } from "react"

import { columns } from "@/components/dashboard/employees/columns"
import EmployeeDataTable from "@/components/dashboard/employees/data-table"
import { TEmployee } from "@/components/dashboard/employees/type"

import { getErrorMessage } from "@/lib/error-message"




const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Array<TEmployee>>([])

  console.log(employees)

  useEffect(() => {
    const getEmployees = async () => {
      
      try {
        const response = await fetch("http://localhost:8080/employees", {
          method: "GET"
        })

        if (!response.ok) {
          const error = await response.json()
          console.log(error)
          throw new Error(error.message)
        }

        const responseData = await response.json()
        console.log("Response data", responseData)
        setEmployees(responseData)
      } 
      catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        console.log(errorMessage)
      }      
    }

    getEmployees()
  }, [])

  return (
    <EmployeeDataTable data={employees} columns={columns} />

  )
}

export default EmployeesPage