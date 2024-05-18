import React from 'react'

import { PlusCircle } from 'lucide-react'

import AddEmployeeForm from './add-employee-form'

import { Role, useCurrentUserContext } from '@/components/providers/current-user/user-context'

import { DialogClose } from '@radix-ui/react-dialog'
import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"




const AddEmployeeDialog = () => {
  const { user } = useCurrentUserContext()
  
  const isAdmin: boolean = user?.role as Role === Role.ADMIN
  const fromHr: boolean = user?.department === "HR"
  const isAllowed: boolean = fromHr && isAdmin  
  // const isAllowed: boolean = true


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size={'sm'}
          disabled={!isAllowed}
        >
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

        <Separator />

        {/* Form */}
        <AddEmployeeForm />

        <Separator />

        <DialogFooter className=''>
          <Button type='submit' form='addEmployeeForm'>
            Add Employee
          </Button>
          <DialogClose asChild>
            <Button type='button' variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  )
}

export default AddEmployeeDialog

