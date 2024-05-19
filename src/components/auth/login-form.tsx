"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import FormSucess from "@/components/auth/form-success"
import FormError from "@/components/auth/form-error"

import CardWrapper from "@/components/auth/card-wrapper"

import loginSchema, { type TloginSchema } from "@/schemas/login-schema"

import { useLogin } from "../hooks/useLogin"

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
  // const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()  
  const {login, error} = useLogin()
  // const router = useRouter()

  // const { dispatch } = useCurrentUserContext()

  
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
    await login(values)
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
                  <Input type="password" placeholder="shadcn" {...field} />
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