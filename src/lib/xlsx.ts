import { TEmployee } from "@/components/dashboard/employees/data"
import xlsx, { IJsonSheet, IJsonSheetRow } from "json-as-xlsx"

export const downloadToExcel = (employees: TEmployee[]) => {
  let columns: IJsonSheet[] = [
    {
      sheet: "Employees",
      columns: [
        {label: "Employee ID", value: "id"},
        {label: "Firstname", value: "firstName"},
        {label: "Lastname", value: "lastName"},
        {label: "Email", value: "email"},
        {label: "Gender", value: "gender"},
        {label: "Active", value: "active"},
        {label: "Birthday", value: (row) => new Date(row.birthDate).toLocaleDateString(),},
        {label: "Department", value: "department"},
        {label: "Designation", value: "designation"},
        {label: "Hire Date", value: "hireDate"},
      ],
      content: employees
    }
  ]

  const settings = {fileName: "Employees"}

  xlsx(columns, settings)
}