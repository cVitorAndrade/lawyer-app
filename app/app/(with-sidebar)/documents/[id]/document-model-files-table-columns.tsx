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
import { IDocumentModelFile } from "@/interfaces/IDocumentModelFile";
import { formatDate } from "@/lib/date-utils";
import { formatFileSize } from "@/lib/file-utils";
import { CaseFileService } from "@/service/case-file.service";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<IDocumentModelFile>[] = [
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
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "originalname",
    header: "Nome do arquivo",
    cell: ({ row }) => (
      <div>
        <h4 className="font-semibold">{row.original.originalname}</h4>
        <p className="text-xs font-semibold text-neutral-500">
          {formatFileSize(row.original.size)}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: "Tamanho do arquivo",
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium">
        {formatFileSize(row.original.size)}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date de upload",
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      const onDonwloadDocumentModelFile = async (id: string) => {
        try {
          const response = await CaseFileService.downloadCaseFile(id);

          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;

          const contentDisposition = response.headers["content-disposition"];
          let filename = "arquivo_desconhecido";

          if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match && match[1]) {
              filename = match[1];
            }
          }

          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.log(
            "DocumentModelFilesTableColumns - onDonwloadDocumentModelFile: ",
            error
          );
        }
      };

      return (
        <div className="w-full flex justify-end">
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
              <DropdownMenuItem
                onClick={() => onDonwloadDocumentModelFile(row.original.id)}
              >
                Fazer download
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
