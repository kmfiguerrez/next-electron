"use client"
 
import { useState } from "react"

import type { Column, ColumnDef } from "@tanstack/react-table"

import { TEmployee } from "./type"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { getErrorMessage } from "@/lib/error-message"
import FormError from "@/components/auth/form-error"


import { useEmployeesContext } from "@/components/providers/employees-context"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"




export const columns: ColumnDef<TEmployee>[] = [
  {
    id: "select",
    header: (props) => {
      return <Checkbox
        checked={props.table.getIsAllPageRowsSelected()}
        onCheckedChange={value => {
          props.table.toggleAllPageRowsSelected(!!value)
        }}
      />
    },
    cell: (props) => {
      return <Checkbox 
        checked={props.row.getIsSelected()}
        onCheckedChange={value => {
          props.row.toggleSelected(!!value)
        }}
      />
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",

  },
  {
    accessorKey: "firstName",
    header: "FirstName",
  },
  {
    accessorKey: "lastName",
    header: "Lastname",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: props => {
      // console.log(typeof props.getValue())
      return props.getValue()
    }
  },
  {
    accessorKey: "gender",
    header: "Gender",
    filterFn: "includesString"
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: props => {
      const cellValue = props.getValue()
      return cellValue ? "Yes" : "No"
    }
  },
  {
    accessorKey: "birthDate",
    header: "Birthday",
    cell: (props) => {
      const birthDate = props.row.getValue("birthDate")
      const formattedDate = new Date(birthDate as string).toLocaleDateString()
      return formattedDate
      
    }
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "hireDate",
    header: (props) => {
      return <SortingButton column={props.column} text="Hire Date" />
    },
    cell: (props) => {
      const hireDate = props.row.getValue("hireDate")
      const formattedDate = new Date(hireDate as string).toLocaleDateString()
      return formattedDate
    }    
  },
  {
    id: "actions",
    cell: (props) => {
      const record: TEmployee = props.row.original

      return <RowActions record={record} />
    }
  }

]





// See: https://ui.shadcn.com/docs/components/dialog
const RowActions = ({ record }: { record: TEmployee }) => {
  const [status, setStatus] = useState<"prompting" | "submitting" | "success">("prompting")
  const [error, setError] = useState<string>();
  // To close dialog after form submission has completed.
  // See: https://www.radix-ui.com/primitives/docs/components/alert-dialog#close-after-asynchronous-form-submission
  const [open, setOpen] = useState(false);
  
  const { dispatch } = useEmployeesContext()

  // Event handlers
  const handleDeleteEmployee = async () => {
    // Reset runtime messages first.
    setStatus("prompting")
    setError(undefined)

    const apiEndpoint = `http://localhost:8080/employees/${record.employeeId}`
    try {
      setStatus("submitting")

      const response = await fetch(apiEndpoint, {method: "DELETE"})

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)
      }
      
      const responseData = await response.json()
      console.log(responseData)
      setStatus("success")

      // Sync the local copy of employees.
      dispatch({type: "deleted", payload: {employeeId: record.employeeId}})

      // Close the dialog once successful.
      setOpen(false)
    } 
    catch (error: unknown) {
      console.log(error)
      const errorMessage = getErrorMessage(error)
      setError(errorMessage)
      setStatus("prompting")
    }     
  }


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          <DropdownMenuItem
            onClick={() => {
              // The navigator is from the global window object api.
              navigator.clipboard.writeText(record.employeeId)
            }}
          >
            Copy person name
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <AlertDialogTrigger className="w-full text-left">
            <DropdownMenuItem className="text-red-500">
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>            
        </DropdownMenuContent>
      </DropdownMenu>      

      <AlertDialogContent>
        {/* Runtime messages */}
        <FormError message={error} />

        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            employee from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Cancel button */}
          <AlertDialogCancel disabled={status === "submitting"} onClick={() => setError(undefined)}>
            Cancel
          </AlertDialogCancel>
          {/* Proceed button */}
          <Button variant={"destructive"} onClick={handleDeleteEmployee}>
            {status === "submitting" ? "Please wait" : "Proceed"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>    
  )
}


type TSortingButton = {
  column: Column<TEmployee, unknown>
  text: string
}

const SortingButton: React.FC<TSortingButton> = ({ column, text }) => {
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        column.toggleSorting(column.getIsSorted() === "asc")
      }}
    >
      {text}
      <ArrowUpDown className="ms-1 h-4 w-4" />
    </Button>
  )
}