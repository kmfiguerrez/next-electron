import { columns } from "@/components/dashboard/employees/columns"
import { employees } from "@/components/dashboard/employees/data"
import EmployeeDataTable from "@/components/dashboard/employees/data-table"

const EmployeesPage = () => {
  return (
    <EmployeeDataTable dataTable={employees} columns={columns} />
  )
}

export default EmployeesPage