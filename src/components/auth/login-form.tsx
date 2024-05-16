"use client"


import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useRouter } from 'next/navigation'

import FormSucess from "@/components/auth/form-success"
import FormError from "@/components/auth/form-error"

import CardWrapper from "@/components/auth/card-wrapper"

import { getErrorMessage } from "@/lib/error-message"

import loginSchema, { type TloginSchema } from "@/schemas/login-schema"

import { useCurrentUserContext } from "../providers/current-user/user-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"



const LoginForm = () => {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()  
  
  const router = useRouter()

  const { dispatch } = useCurrentUserContext()

  
  const apiEndpoint = 'http://localhost:8080/auth/login'

  // 1. Define your form.
  const form = useForm<TloginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: TloginSchema) {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    // Do something with the form values.
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
      
      const response = await fetch(apiEndpoint, requestOptions)

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)
      }
      
      const responseData = await response.json()
      console.log(responseData)

      dispatch({type: "signIn", payload: { user: responseData }})

      router.push("/dashboard")

      // It will be recognize at runtime.
      // console.log(window.electronAPI.getURL())
    } 
    catch (error: unknown) {
      console.log(error)
      const errorMessage = getErrorMessage(error)
      // console.log("Err message: ", getErrorMessage)
      setError(errorMessage)
    }
  }  


  return (
    <CardWrapper 
      title="Login" 
      backButtonHref="/register" 
      backButtonLabel="Don't have an account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          {/* Runtime messages. */}
          <FormSucess message={success} />
          <FormError message={error} />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting ? "loading" : "Login"}
          </Button>

          {/* <Button
            type="button"
            onClick={async () => {
              const cookie = await window.electronAPI.getCookie()
              console.log(cookie)
            }}
          >
            Get cookie
          </Button> */}

        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm