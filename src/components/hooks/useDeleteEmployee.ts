import { Dispatch, SetStateAction, useState } from "react"

import { useCurrentUserContext } from "../providers/current-user/user-context"
import { useEmployeesContext } from "../providers/employees-context"

import { getErrorMessage } from "@/lib/error-message"

import type { TEmployee } from "../dashboard/employees/type"

import { EMPLOYEES } from "@/lib/api-endpoints"


type TuseDeleteEmployeeProp = {
  onSetError: Dispatch<SetStateAction<string | undefined>>
  record: TEmployee
}

export const useDeleteEmployee = (config: TuseDeleteEmployeeProp) => {
  const [deletingStatus, setDeleteStatus] = useState<"prompting" | "submitting">("prompting")
  const { record, onSetError } = config

  const { user } = useCurrentUserContext()
  const { dispatch } = useEmployeesContext()


  const deleteEmployee = async () => {
    // Reset runtime messages first.
    setDeleteStatus("prompting")
    onSetError(undefined)

    try {
      setDeleteStatus("submitting")

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }      
      }      

      const response = await fetch(`${EMPLOYEES.DELETE_ENDPOINT}/${record.employeeId}`, requestOptions)

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)
      }
      
      const responseData = await response.json()
      // console.log(responseData)

      // Sync the local copy of employees.
      dispatch({type: "deleted", payload: {employeeId: record.employeeId}})

    } 
    catch (error: unknown) {
      console.log(error)
      const errorMessage = getErrorMessage(error)
      onSetError(errorMessage)
      setDeleteStatus("prompting")
    }    
  }

  return {deleteEmployee, deletingStatus}
}