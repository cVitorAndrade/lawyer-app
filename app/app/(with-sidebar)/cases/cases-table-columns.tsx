import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowRight, ArrowUp, CircleCheckBig, CircleOff, CirclePause, MoreHorizontal, Timer } from 'lucide-react'
import { DataTableColumnHeader } from './cases-table-header'

type Cases = {
  id: string
  type: 'administrative' | 'judicial'
  status: 'in progress' | 'finished' | 'canceled' | 'paused'
  createdBy: User
  priority: 'low' | 'medium' | 'high'
  client: string
  title: string
  assignedUsers: User[]
  createdAt: string
  updatedAt: string
}

type User = {
  id: string
  name: string
  email: string
  image: string
}

const statusStyle = {
  'in progress': {
    icon: <Timer size={16} />,
    bg: 'bg-blue-200/50',
    color: 'text-blue-700'
  },
  'paused': {
    icon: <CirclePause size={16} />,
    bg: 'bg-yellow-200/50',
    color: 'text-yellow-700'
  },
  'finished': {
    icon: <CircleCheckBig size={16} />,
    bg: 'bg-green-200/50',
    color: 'text-green-700'
  },
  'canceled': {
    icon: <CircleOff size={16} />,
    bg: 'bg-red-200/50',
    color: 'text-red-700'
  }
}

const typeStyles = {
  'administrative': 'text-blue-800 bg-blue-100/50',
  'judicial': 'text-purple-800 bg-purple-100/50'
}

const priorityIcon = {
  'low': <ArrowDown size={14} />,
  'medium': <ArrowRight size={14} />,
  'high': <ArrowUp size={14} />,
}

export const cases: Cases[] = [
  {
    id: '728ed52f',
    client: 'John Doe',
    assignedUsers: [
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '11634j2h',
        image: 'https://github.com/cvitorandrade.png',
      },
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '1ks34j2h',
        image: 'https://github.com/maykbrito.png',
      },
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '11s34j2h',
        image: 'https://github.com/cvitorandrade.png',
      },
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '1kg34j2h',
        image: 'https://github.com/maykbrito.png',
      },
    ],
    createdAt: 'Dez 25, 2024',
    createdBy: {
      email: 'email@email.com',
      name: 'John Doe',
      id: 'a34fpsh',
      image: 'https://github.com/cvitorandrade.png'
    },
    priority: 'low',
    status: 'in progress',
    title: 'Caso tal',
    type: 'administrative',
    updatedAt: 'Dez 25, 2024'
  },
  {
    id: '489b1d42',
    client: 'Carter Doe',
    assignedUsers: [
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '1ks34j2h',
        image: 'https://github.com/cvitorandrade.png',
      },
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '11s34j2h',
        image: 'https://github.com/cvitorandrade.png',
      },
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '1kg34j2h',
        image: 'https://github.com/maykbrito.png',
      },
    ],
    createdAt: 'Dez 25, 2024',
    createdBy: {
      email: 'email@email.com',
      name: 'John Doe',
      id: 'a34fash',
      image: 'https://github.com/cvitorandrade.png'
    },
    priority: 'medium',
    status: 'finished',
    title: 'Caso tal',
    type: 'judicial',
    updatedAt: 'Dez 25, 2024'
  },
  {
    id: '489e1d42',
    client: 'Daniel Doe',
    assignedUsers: [
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '1ks34j2h',
        image: 'https://github.com/cvitorandrade.png',
      },
    ],
    createdAt: 'Dez 25, 2024',
    createdBy: {
      email: 'email@email.com',
      name: 'John Doe',
      id: 'a34fash',
      image: 'https://github.com/cvitorandrade.png'
    },
    priority: 'medium',
    status: 'canceled',
    title: 'Caso tal',
    type: 'judicial',
    updatedAt: 'Dez 25, 2024'
  },
  {
    id: '72ed52f',
    client: 'Anna Doe',
    assignedUsers: [
      {
        email: 'email@email.com',
        id: '1ks34j2h',
        name: 'John Doe',
        image: 'https://github.com/cvitorandrade.png',
      },
      {
        email: 'email@email.com',
        name: 'John Doe',
        id: '1kg34j2h',
        image: 'https://github.com/maykbrito.png',
      },
    ],
    createdAt: 'Dez 25, 2024',
    createdBy: {
      email: 'email@email.com',
      name: 'John Doe',
      id: 'a34fash',
      image: 'https://github.com/cvitorandrade.png'
    },
    priority: 'high',
    status: 'paused',
    title: 'Caso tal',
    type: 'administrative',
    updatedAt: 'Dez 25, 2024'
  },
]

export const columns: ColumnDef<Cases>[] = [
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
        onClick={e => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'client',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: (({ row }) => (
      <span className="text-neutral-700 font-medium">
        {row.original.client}
      </span>
    )),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (({ row }) => (
      <span className="text-neutral-700 font-medium truncate block max-w-32">
        {row.original.title}
      </span>
    ))
  },
  {
    accessorKey: 'createdBy',
    header: 'Created by',
    accessorFn: (row) => row.createdBy.name,
    cell: (({ row }) => (
      <div
        className="flex gap-4 items-center"
      >
        <div
          className='size-8'
        >
          <img 
            src={row.original.createdBy.image}
            alt="user image"
            className="rounded-full size-8"
          />
        </div>
        <div>
          <h4
            className="font-semibold text-neutral-700"
          >
            {row.original.createdBy.name}
          </h4>
          <p
            className="text-xs font-semibold text-neutral-500"
          >
            {row.original.createdBy.email}
          </p>
        </div>
      </div>
    ))
  },
  {
    accessorKey: 'assignedUsers',
    header: 'Assigned Users',
    cell: (({ row }) => (
      <div className="flex relative -space-x-2 group">
        {row.original.assignedUsers.map(({ id, image, name }) => (
          <TooltipProvider
            key={id}
          >
            <Tooltip
              delayDuration={300}
            >
              <TooltipTrigger>
                <img
                  src={image}
                  alt=""
                  className="rounded-full cursor-auto w-8 h-8 border-2 border-white transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-100 hover:z-10"
                />
              </TooltipTrigger>
              <TooltipContent>
                {name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ))
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: (({ row }) => (
      <div
        className={
          cn(
            'flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg',
            typeStyles[row.original.type]
          )
        }
      >
        <span className='capitalize'>{row.original.type}</span>
      </div>
    ))
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (({ row }) => (
      <div
        className={
          cn(
            'flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg',
            statusStyle[row.original.status].bg,
            statusStyle[row.original.status].color,
          )
        }
      >
        {statusStyle[row.original.status].icon}
        <span className='capitalize'>{row.original.status}</span>
      </div>
    ))
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: (({ row }) => (
      <div className='flex gap-2 items-center text-sm font-normal'>
        {priorityIcon[row.original.priority]}
        <span className='capitalize'>{row.original.priority}</span>
      </div>
    ))
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date created" />
    ),
    cell: (({ row }) => (
      <span className="text-neutral-700 font-medium">
        {row.original.createdAt}
      </span>
    ))
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last update" />
    ),
    cell: (({ row }) => (
      <span className="text-neutral-700 font-medium">
        {row.original.updatedAt}
      </span>
    ))
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const caseId = row.original.id
 
      return (
        <div
          className="w-full flex justify-end"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={e => e.stopPropagation()}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(caseId)}
              >
                Copy caseID
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