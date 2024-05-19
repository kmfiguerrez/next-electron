import { REGISTER_ENDPOINT } from "@/lib/api-endpoints"
import { getErrorMessage } from "@/lib/error-message"
import { useState } from "react"

type TRegisterPayload = {
  employeeId: string
  email: string
  password: string
}

export const useSignup = () => {
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()


  const signup = async (registerPayload: TRegisterPayload) => {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerPayload)
    }    

    try {
      const response = await fetch(REGISTER_ENDPOINT, requestOptions)

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)      
      }

      const data = await response.json()
      setSuccess("Account registered")

    } 
    catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      setError(errorMessage)
    }        
  }

  return {success, error, signup}
}