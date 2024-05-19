import React, { Dispatch, SetStateAction } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import employeeSchema, {Active, type TEmployeeSchema } from '@/schemas/employee-schema'

import { Gender, TEmployee } from '../type'

import FormSucess from '@/components/auth/form-success'
import FormError from '@/components/auth/form-error'

import { toDateOnlyForm } from '@/lib/date'

import { useEditEmployee } from '@/components/hooks/useEditEmployee'

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



// Edit status comes from the row action components for the alert dialog
// component buttons to react to.
type TEditEmployeeFormProps = {
  record: TEmployee
  onEditStatus: Dispatch<SetStateAction<"editing" | "submitting" | "success">>
}

const EditEmployeeForm: React.FC<TEditEmployeeFormProps> = ({ record, onEditStatus }) => {
  const { success, error, editEmployee } = useEditEmployee({employeeId: record.employeeId, onEditStatus})

  // 1. Define your form.
  const form = useForm<TEmployeeSchema>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeId: record.employeeId,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      gender: record.gender,
      active: record.active === true ? Active.YES : Active.NO,
      birthDate: toDateOnlyForm(new Date(record.birthDate).toLocaleDateString()),
      designation: record.designation,
      department: record.department,
      hireDate: toDateOnlyForm(new Date(record.hireDate).toLocaleDateString()),
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: TEmployeeSchema) {
    await editEmployee(values)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id='employeeEditForm'>

        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="Employee ID" {...field} disabled />
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

      </form>
    </Form>
  )
}

export default EditEmployeeForm