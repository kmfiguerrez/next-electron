import { Dispatch, SetStateAction, useState } from "react"

import { TEmployeeSchema } from "@/schemas/employee-schema"

import { useCurrentUserContext } from "../providers/current-user/user-context"
import { useEmployeesContext } from "../providers/employees-context"
import { getErrorMessage } from "@/lib/error-message"
import { EMPLOYEES_ENDPOINT } from "@/lib/api-endpoints"


type TuseEditEmployeeProp = {
  employeeId: string
  onEditStatus: Dispatch<SetStateAction<"editing" | "submitting" | "success">>
}

export const useEditEmployee = (config: TuseEditEmployeeProp) => {
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()

  const { employeeId, onEditStatus } = config

  const { user } = useCurrentUserContext()
  const { dispatch } = useEmployeesContext()

  const editEmployee = async (editPayload: TEmployeeSchema) => {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)
    // Reset status.
    onEditStatus("editing")
    
    /*
      The reason why active prop is enum in the employee schema is that
      it is hard to work with boolean in forms.
      But before sending the payload, we turn the active prop value to
      back boolean.
      The date of birth and hire are date strings in the employee schema.    
    */
      console.log(editPayload)

      const payload = {
        ...editPayload, 
        active: editPayload.active === "yes" ? true : false
      }

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.accessToken}` 
        },
        body: JSON.stringify(payload)
      }
  
      try {
        onEditStatus("submitting")
  
        const response = await fetch(`${EMPLOYEES_ENDPOINT}/${employeeId}`, requestOptions)
  
        if (!response.ok) {
          const error = await response.json()
          console.log(error)
          // console.log(error.error)
          throw new Error(error.message)
        }
        
        // const responseData = await response.json()
        // console.log(responseData)
        setSuccess("Employee updated")
        onEditStatus("success")
  
        // Sync the employees local copy.
        dispatch({
          type: "changed", 
          payload: {
            ...payload,
            hireDate: new Date(payload.hireDate),
            birthDate: new Date(payload.birthDate)
          }
        })
      } 
      catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        setError(errorMessage)
        onEditStatus("editing")
      }    
  }

  return {success, error, editEmployee}
}