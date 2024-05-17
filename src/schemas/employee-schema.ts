import { z } from "zod"

import { Gender } from "@/components/dashboard/employees/type"

export enum Active {
  YES = "yes",
  NO = "no"
}

const employeeSchema = z.object({
  employeeId: z.string({ required_error: "Employee ID is required" })
    .min(1, "Employee ID is required").trim(),
  firstName: z.string({ required_error: "First name is required" })
    .min(1, "First name is required").trim(),
  lastName: z.string({ required_error: "Last name is required" })
    .min(1, "Last name is required").trim(),  
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    .trim(),
  gender: z.nativeEnum(Gender),
  active: z.nativeEnum(Active),
  birthDate: z.string()
    .min(1, {message: "Date of birth is required"})
    .date("Invalid date string"),
  designation: z.string({ required_error: "Designation is required" })
    .min(1, "Designation is required")
    .trim(),
  department: z.string({ required_error: "Department is required" })
    .min(1, "Department is required")
    .trim(),
  hireDate: z.string()
    .min(1, {message: "Hire date is required"})
    .date("Invalid date string"),
})

export type TEmployeeSchema = z.infer<typeof employeeSchema>

export default employeeSchema