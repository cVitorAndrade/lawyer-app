import { deleteDocumentModelFile } from "@/actions/document-model-file/delete-document-model-file";
import { downloadDocumentModelFile } from "@/actions/document-model-file/download-document-model-file";
import { revalidate } from "@/actions/revalidate-path";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDocumentModelFile } from "@/interfaces/IDocumentModelFile";
import { formatDate } from "@/lib/date-utils";
import { formatFileSize } from "@/lib/file-utils";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

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
      const onDonwloadDocumentModelFile = async (id: string) => {
        try {
          const fileData = await downloadDocumentModelFile(id);

          if (!fileData) {
            console.error("Erro ao obter o arquivo");
            return;
          }

          const blob = new Blob([fileData.buffer], {
            type: fileData.contentType,
          });

          const url = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = fileData.filename;
          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.log(
            "DocumentModelFilesTableColumns - onDonwloadDocumentModelFile: ",
            error
          );
        }
      };

      const onDeleteDocumentModelFile = async (id: string) => {
        try {
          await deleteDocumentModelFile(id);
          toast.success("Arquivo apagado com sucesso!");
          revalidate(window.location.pathname);
        } catch (error) {}
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
            <DropdownMenuContent align="end" className="flex flex-col gap-0.5">
              <DropdownMenuItem asChild>
                <Button
                  onClick={async () =>
                    await onDonwloadDocumentModelFile(row.original.id)
                  }
                  variant="outline"
                  className="focus-visible:ring-0"
                >
                  <Download />
                  Fazer download
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button
                  onClick={async () =>
                    await onDeleteDocumentModelFile(row.original.id)
                  }
                  variant="outline"
                  className="text-red-500 focus-visible:ring-0"
                >
                  <Trash />
                  Apagar arquivo
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
