"use client"
 
import type { Column, ColumnDef } from "@tanstack/react-table"

import type { TEmployee } from "./data"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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
    accessorKey: "id",
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


const RowActions = ({ record }: { record: TEmployee }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            // The navigator is from the global window object api.
            navigator.clipboard.writeText(record.id)
          }}
        >
          Copy person name
        </DropdownMenuItem>
        <DropdownMenuItem>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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