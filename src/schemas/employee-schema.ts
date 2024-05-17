import { z } from "zod"

import { Gender } from "@/components/dashboard/employees/type"

export enum Active {
  YES = "yes",
  NO = "no"
}

const employeeSchema = z.object({
  employeeId: z.string({ required_error: "Employee ID is required" })
  .min(1, "Employee ID is required"),
  firstName: z.string({ required_error: "First name is required" })
  .min(1, "First name is required"),
  lastName: z.string({ required_error: "Last name is required" })
  .min(1, "Last name is required"),  
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  gender: z.nativeEnum(Gender),
  active: z.nativeEnum(Active),
  birthDate: z.string().date(),
  // birthDate: z.date({required_error: "Date of birth is required", invalid_type_error: "Hire date must be a date"}),
  designation: z.string({ required_error: "Designation is required" })
  .min(1, "Designation is required"),
  department: z.string({ required_error: "Department is required" })
  .min(1, "Department is required"),
  hireDate: z.string().date(),
  // hireDate: z.date({required_error: "Hire date is required", invalid_type_error: "Hire date must be a date"}),
})

export type TEmployeeSchema = z.infer<typeof employeeSchema>

export default employeeSchema