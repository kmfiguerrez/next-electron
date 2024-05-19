"use client"

import { columns } from "@/components/dashboard/employees/columns"
import EmployeeDataTable from "@/components/dashboard/employees/data-table"

import { useGetEmployees } from "@/components/hooks/useGetEmployees"


const EmployeesPage = () => {
  const {employees, error} = useGetEmployees()

  return <EmployeeDataTable data={employees} columns={columns} />
}

export default EmployeesPage