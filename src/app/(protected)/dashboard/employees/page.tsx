"use client"

import { columns } from "@/components/dashboard/employees/columns"
import { employees } from "@/components/dashboard/employees/data"
import EmployeeDataTable from "@/components/dashboard/employees/data-table"
import { getErrorMessage } from "@/lib/error-message"
import { useEffect, useState } from "react"


enum Gender {
  MALE = "Male",
  FEMALE = "Female"
}

export type TEmployee = {
  id: string
  birthDate: Date
  firstName: string
  lastName: string
  gender: Gender
  designation: string
  department: string
  hireDate: Date
  active: boolean
  email: string
}

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
        console.log(responseData)
        setEmployees(responseData)
        console.log(employees)
      } 
      catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        console.log(errorMessage)
      }      
    }

    getEmployees()
  }, [])

  return (
    <EmployeeDataTable dataTable={employees} columns={columns} />

  )
}

export default EmployeesPage