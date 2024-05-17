import React from 'react'

import { PlusCircle } from 'lucide-react'

import EmployeeForm from './add-employee-form'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



const AddEmployeeDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </DialogTrigger>

      <DialogContent className='h-[500px] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            This action will add employee to the database.
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <EmployeeForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddEmployeeDialog