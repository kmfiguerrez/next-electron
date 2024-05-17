"use client"

import React from 'react'
 
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TReactTable,  
} from "@tanstack/react-table"

import { downloadToExcel } from '@/lib/xlsx'

import { TEmployee } from './type'
import AddEmployee from './forms/add-employee'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function EmployeeDataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  // const [data, setData] = useState(dataTable)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })

  // console.log(table.getHeaderGroups())
  // table.getHeaderGroups().map(headerGroup => console.log(headerGroup))
  // console.log("table row: ", table.getRowModel())
  
  return (
    <div>
      {/* Filtering */}
      <div className='flex items-center py-4 justify-between'>
        {/* <Input 
          placeholder='Filter by gender'
          value={table.getColumn("gender")?.getFilterValue() as string || ""}
          onChange={e => {
            const row = table.getColumn("gender")?.setFilterValue(e.target.value)
            console.log(table.getFilteredRowModel().rows.map(row => console.log(row.original)))
          }}
          className='max-w-sm'
        /> */}

        <Input 
          placeholder='Filter by email'
          value={table.getColumn("email")?.getFilterValue() as string || ""}
          onChange={e => {
            const row = table.getColumn("email")?.setFilterValue(e.target.value)
            // console.log(table.getFilteredRowModel())
            console.log(table.getFilteredRowModel().rows.map(row => console.log(row.original)))
          }}
          className='max-w-sm'
        />

        <div className='flex items-center'>
          <Button
            onClick={() => {
              const employees = table.getFilteredRowModel().rows.map(row => row.original)
              downloadToExcel(employees as Array<TEmployee>)
            }}
          >
            Export
          </Button>

          <AddEmployee />

          <ColumnsVisibility table={table} />
        </div>
      </div>

      {/* Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {/* Check first if there's record. */}
            {table.getRowModel().rows.length ? (
                // List the rows.
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {/* List the cells. */}
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ): (
                <TableRow>
                  <TableCell>
                    No results
                  </TableCell>
                </TableRow>                
              )
            }
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>        
      </div>

      {/* Selected rows */}
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>      
    </div>
  )
}

export default EmployeeDataTable


type TColumnVisibilityProps<TData> = {
  table: TReactTable<TData>
}

function ColumnsVisibility<TData> ({table}: TColumnVisibilityProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline" className="ml-auto">
        Columns
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {table.getAllColumns().filter(column => column.getCanHide()).map(column => {
          return (
            <DropdownMenuCheckboxItem 
              key={column.id}
              className='capitalize'
              checked={column.getIsVisible()}
              onCheckedChange={value => {
                column.toggleVisibility(!!value)
              }}
            >
              {column.id === "id" ? "employee id": column.id}
            </DropdownMenuCheckboxItem>
          )
        })

        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}