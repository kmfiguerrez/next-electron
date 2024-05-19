"use client"
 
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import registerSchema, { TregisterSchema } from "@/schemas/register-schema"

import FormSucess from "@/components/auth/form-success"
import FormError from "@/components/auth/form-error"

import CardWrapper from "@/components/auth/card-wrapper"

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
import { useSignup } from "../hooks/useSignup"



const RegisterForm = () => {
  const {success, error, signup} = useSignup()
  

  // 1. Define your form.
  const form = useForm<TregisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      employeeId: "",
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: TregisterSchema) {

    await signup(values)
    form.reset()

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
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Employee ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />    

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