"use client"

import { useEffect } from "react"

import { columns } from "@/components/dashboard/employees/columns"
import EmployeeDataTable from "@/components/dashboard/employees/data-table"

import { getErrorMessage } from "@/lib/error-message"

import { useEmployeesContext } from "@/components/providers/employees-context"
import { useCurrentUserContext } from "@/components/providers/current-user/user-context"





const EmployeesPage = () => {
  const {employees, dispatch} = useEmployeesContext()

  const { user } = useCurrentUserContext()
  

  useEffect(() => {
    const getEmployees = async () => {
      
      try {
        const response = await fetch("http://localhost:8080/employees", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user?.accessToken}` 
          }
        })

        if (!response.ok) {
          const error = await response.json()
          console.log(error)
          throw new Error(error.message)
        }

        const responseData = await response.json()
        // console.log("Response data", responseData)

        // Sync employees local copy.
        dispatch({
          type: "set",
          payload: responseData
        })
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