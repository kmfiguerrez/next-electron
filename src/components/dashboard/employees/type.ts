export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export type TEmployee = {
  employeeId: string
  birthDate: Date
  firstName: string
  lastName: string
  gender: Gender
  designation: string
  department: string
  hireDate: Date
  active: boolean
  email: string
}