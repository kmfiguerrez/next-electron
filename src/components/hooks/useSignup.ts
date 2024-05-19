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

  // const registerEndpoint = `${process.env.API_SERVER}${process.env.REGISTER_ENDPOINT}`
  const registerEndpoint = `http://localhost:8080/auth/register`


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
      const response = await fetch(registerEndpoint, requestOptions)

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)      
      }

      const data = await response.json()
      setSuccess("User account registered")

    } 
    catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      setError(errorMessage)
    }        
  }

  return {success, error, signup}
}