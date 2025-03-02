import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { File as FileIcon, MoreHorizontal } from 'lucide-react'

type File = {
  id: string
  filename: string
  size: string
  createdAt: string
  uploadedBy: string
}
 
export const files: File[] = [
  {
    id: '728ed52f',
    filename: 'filename.pdf',
    size: '512 KB',
    createdAt: 'Dez 25, 2024',
    uploadedBy: 'John Doe'
  },
  {
    id: '489e1d42',
    filename: 'filename.jpg',
    size: '512 KB',
    createdAt: 'Dez 25, 2024',
    uploadedBy: 'John Doe'
  },
  {
    id: '72ed52f',
    filename: 'filename.docx',
    size: '512 KB',
    createdAt: 'Dez 25, 2024',
    uploadedBy: 'John Doe'
  },
]

export const columns: ColumnDef<File>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'filename',
    header: 'File name',
    cell: (({ row }) => (
      <div
        className="flex gap-4 items-center"
      >
        <div
          className="bg-zinc-300 rounded-full size-8 flex justify-center items-center"
        >
          <FileIcon size={16} />
        </div>
        <div>
          <h4
            className="font-semibold"
          >
            {row.original.filename}
          </h4>
          <p
            className="text-xs font-semibold text-neutral-500"
          >
            {row.original.size}
          </p>
        </div>
      </div>
    ))
  },
  {
    accessorKey: 'size',
    header: 'File size',
    cell: (({ row }) => (
      <span className="text-neutral-700 font-medium">
        {row.original.size}
      </span>
    ))
  },
  {
    accessorKey: 'createdAt',
    header: 'Date uploaded',
    cell: (({ row }) => (
      <span className="text-neutral-700 font-medium">
        {row.original.createdAt}
      </span>
    ))
  },
  {
    accessorKey: 'uploadedBy',
    header: 'Uploaded by',
    cell: (({ row }) => (
      <div
        className="flex gap-4 items-center"
      >
        <div
          className='size-8'
        >
          <img 
            src="https://github.com/cvitorandrade.png"
            alt="user image"
            className="rounded-full size-8"
          />
        </div>
        <div>
          <h4
            className="font-semibold text-neutral-700"
          >
            {row.original.uploadedBy}
          </h4>
          <p
            className="text-xs font-semibold text-neutral-500"
          >
            john@email.com
          </p>
        </div>
      </div>
    ))
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)
 
  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <div
          className="w-full flex justify-end"
        >
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
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]