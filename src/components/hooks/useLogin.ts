import { useState } from "react"

import { useRouter } from 'next/navigation'

import { AUTH } from "@/lib/api-endpoints"

import { getErrorMessage } from "@/lib/error-message"

import { useCurrentUserContext } from "../providers/current-user/user-context"



type TLoginPayload = {
  email: string
  password: string
}

export const useLogin = () => {
  const [error, setError] = useState<string>()
  const { dispatch } = useCurrentUserContext()

  const router = useRouter()


  const login = async (loginPayload: TLoginPayload) => {
    // Reset runtime messages first.
    setError(undefined)

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginPayload)
    }    

    try {
      const response = await fetch(AUTH.LOGIN_ENDPOINT, requestOptions)

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)      
      }

      const data = await response.json()

      dispatch({
        type: "signIn",
        payload: {user: data}
      })

      router.push("/dashboard")
    } 
    catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      setError(errorMessage)
    }        
  }

  return {login, error}
}