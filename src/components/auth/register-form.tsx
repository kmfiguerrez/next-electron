"use client"
 
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import registerSchema, { TregisterSchema } from "@/schemas/register-schema"

import FormSucess from "@/components/auth/form-success"
import FormError from "@/components/auth/form-error"

import CardWrapper from "@/components/auth/card-wrapper"

import { getErrorMessage } from "@/lib/error-message"

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



const RegisterForm = () => {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()  
 
  
  const apiEndpoint = 'http://localhost:8080/api/auth/register'


  // 1. Define your form.
  const form = useForm<TregisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: TregisterSchema) {
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
        throw new Error(error.message)
      }
      
      const responseData = await response.json()

      console.log(responseData)
      setSuccess("Account registered")
      form.reset()
    } 
    catch (error: unknown) {
      console.log(error)
      const errorMessage = getErrorMessage(error)
      // console.log("Err message: ", getErrorMessage)
      setError(getErrorMessage(error))
    }
  }  




  return (
    <CardWrapper 
      title="Register" 
      backButtonHref="/login" 
      backButtonLabel="Already have an account"
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
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting ? "loading" : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm