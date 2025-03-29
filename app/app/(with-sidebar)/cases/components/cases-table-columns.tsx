import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleCheckBig,
  CircleOff,
  CirclePause,
  MoreHorizontal,
  Timer,
} from "lucide-react";
import { DataTableColumnHeader } from "./cases-table-header";
import { ICase } from "@/interfaces/ICase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback, getAvatarUrl } from "@/hooks/use-avatar-url";
import { formatDate } from "@/lib/date-utils";

const statusStyle = {
  IN_PROGRESS: {
    icon: <Timer size={16} />,
    bg: "bg-blue-200/50",
    color: "text-blue-700",
  },
  PAUSED: {
    icon: <CirclePause size={16} />,
    bg: "bg-yellow-200/50",
    color: "text-yellow-700",
  },
  FINISHED: {
    icon: <CircleCheckBig size={16} />,
    bg: "bg-green-200/50",
    color: "text-green-700",
  },
  CANCELED: {
    icon: <CircleOff size={16} />,
    bg: "bg-red-200/50",
    color: "text-red-700",
  },
};

const typeStyles = {
  ADMINISTRATIVE: "text-blue-800 bg-blue-100/50",
  JUDICIAL: "text-purple-800 bg-purple-100/50",
};

const priorityIcon = {
  LOW: <ArrowDown size={14} />,
  MEDIUM: <ArrowRight size={14} />,
  HIGH: <ArrowUp size={14} />,
};

export const columns: ColumnDef<ICase>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
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
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium max-w-32 block truncate">
        {row.original.clients[0]?.name || "Sem cliente"}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título do caso" />
    ),
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium truncate block max-w-32">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: "createdBy",
    header: "Criado por",
    accessorFn: (row) => row.createdBy.name,
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <div className="size-8">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage
              src={getAvatarUrl(row.original.createdBy.avatar) || ""}
              alt={row.original.createdBy.name}
            />
            <AvatarFallback className="rounded-lg">
              {getAvatarFallback(row.original.createdBy.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-700">
            {row.original.createdBy.name}
          </h4>
          <p className="text-xs font-semibold truncate block text-neutral-500 max-w-24">
            {row.original.createdBy.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "assignedUsers",
    header: "Participantes",
    cell: ({ row }) => (
      <div className="flex relative -space-x-2 group">
        {row.original.lawyers.map(({ id, avatar, name }) => (
          <TooltipProvider key={id}>
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <Avatar className="h-8 w-8 rounded-full border-2 border-white">
                  <AvatarImage src={getAvatarUrl(avatar)} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {getAvatarFallback(row.original.createdBy.name)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          "flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg",
          typeStyles[row.original.type]
        )}
      >
        <span className="capitalize">{row.original.type}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          "flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg",
          statusStyle[row.original.status].bg,
          statusStyle[row.original.status].color
        )}
      >
        {statusStyle[row.original.status].icon}
        <span className="capitalize">{row.original.status}</span>
      </div>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridade" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 items-center text-sm font-normal">
        {priorityIcon[row.original.priority]}
        <span className="capitalize">{row.original.priority}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Atualizado em" />
    ),
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium">
        {formatDate(row.original.updatedAt)}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const caseId = row.original.id;

      return (
        <div className="w-full flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
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
      );
    },
  },
];
