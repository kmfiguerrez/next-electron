import { useEffect, useState } from "react"

import { useEmployeesContext } from "../providers/employees-context"
import { useCurrentUserContext } from "../providers/current-user/user-context"

import { getErrorMessage } from "@/lib/error-message"

import { EMPLOYEES } from "@/lib/api-endpoints"



export const useGetEmployees = () => {
  const [error, setError] = useState<string>()

  const { employees, dispatch } = useEmployeesContext()
  const { user } = useCurrentUserContext()


  useEffect(() => {
    const getEmployees = async () => {
      
      try {
        const response = await fetch(EMPLOYEES.GET_ALL_ENDPOINT, {
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

        const data = await response.json()

        // Sync employees local copy.
        dispatch({
          type: "set",
          payload: data
        })
      } 
      catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        console.log(errorMessage)
        setError(errorMessage)
      }      
    }

    getEmployees()   
  }, [])

  return { employees, error }
}