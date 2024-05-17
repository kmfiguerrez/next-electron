import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import employeeSchema, {Active, type TEmployeeSchema } from '@/schemas/employee-schema'

import { Gender } from '../type'

import { getErrorMessage } from '@/lib/error-message'

import FormSucess from '@/components/auth/form-success'
import FormError from '@/components/auth/form-error'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEmployeesContext } from '@/components/providers/employees-context'






const AddEmployeeForm = () => {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  
  const { dispatch } = useEmployeesContext()

  // 1. Define your form.
  const form = useForm<TEmployeeSchema>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: Gender.MALE,
      active: Active.NO,
      birthDate: "",
      designation: "",
      department: "",
      hireDate: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: TEmployeeSchema) {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    /*
      The reason why active prop is enum in the employee schema is that
      it is hard to work with boolean in forms.
      But before sending the payload, we turn the active prop value to
      boolean.    
    */
    console.log(values)

    const apiEndpoint: string = "http://localhost:8080/employees"
    const payload = {
      ...values, 
      active: values.active === "yes" ? true : false
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

    try {
      const response = await fetch(apiEndpoint, requestOptions)

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        // console.log(error.error)
        throw new Error(error.message)
      }
      
      const responseData = await response.json()
      // console.log(responseData)
      setSuccess("Employee added")

      // Sync the employees local copy.
      dispatch({
        type: "added", 
        payload: {
          ...payload,
          hireDate: new Date(payload.hireDate),
          birthDate: new Date(payload.birthDate)
        }
      })

      // Reset form.
      form.reset()
      
    } 
    catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      // console.log("Err message: ", getErrorMessage)
      setError(errorMessage)
    }
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="Employee ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
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
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Gender.MALE}>Male</SelectItem>
                  <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Active.YES}>Yes</SelectItem>
                  <SelectItem value={Active.NO}>No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />              

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input type='date' placeholder="Employee ID"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input placeholder="Deparment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="hireDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of hire</FormLabel>
              <FormControl>
                <Input type='date' placeholder="Employee ID"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Runtime messages. */}
        <FormSucess message={success} />
        <FormError message={error} />

        <Button type="submit">Add Employee</Button>

      </form>
    </Form>
  )
}

export default AddEmployeeForm