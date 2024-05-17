import React, { createContext, useContext, useReducer } from 'react'
import type { TEmployee } from '../dashboard/employees/type'


type TEmployeesContext = {
  employees: Array<TEmployee>
  dispatch: React.Dispatch<TAction>
}


// Define employees context.
const EmployeesContext = createContext<TEmployeesContext| null>(null)


// Context provider.
const initialEmployees: Array<TEmployee> = []

const EmployeesProvider = ({ children }: { children: React.ReactNode}) => {
  const [employees, dispatch] = useReducer(employeesReducer, initialEmployees)
  return (
    <EmployeesContext.Provider value={{employees, dispatch}}>
      {children}
    </EmployeesContext.Provider>
  )
}

export default EmployeesProvider




// Reducer function
type TSetAction = {
  type: "set"
  payload: Array<TEmployee>
}

type TAddAction = {
  type: "added"
  payload: TEmployee
}

type TChangeAction = {
  type: "changed"
  payload: TEmployee
}

type TDeleteAction = {
  type: "deleted"
  payload: {employeeId: string}
}

type TAction = TSetAction | TAddAction | TChangeAction | TDeleteAction

const employeesReducer = (currentEmployees: Array<TEmployee>, action: TAction) => {
  switch (action.type) {
    case "set": {
      return action.payload
    }
    case "added": {
      return [...currentEmployees, action.payload]
    }
    case "changed": {
      return currentEmployees.map(employee => {
        if (employee.employeeId === action.payload.employeeId) return action.payload
        else return employee
      })
    }
    case "deleted": {
      return currentEmployees.filter(employee => employee.employeeId !== action.payload.employeeId)
    }
    default:
      console.log(action)
      throw Error(`Unknown action`)
  }
}


// Custom hooks
export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext)

  // Custom hooks can only be used inside the provider.
  if (!context) {
    throw new Error("useEmployeesContextt must be used inside EmployeesProvider")
  }

  return context
}