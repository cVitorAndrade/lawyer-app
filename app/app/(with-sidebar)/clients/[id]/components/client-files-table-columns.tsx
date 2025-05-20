import { deleteCaseFile } from "@/actions/case-file/delete-case-file";
import { downloadCaseFile } from "@/actions/case-file/download-case-file";
import { revalidate } from "@/actions/revalidate-path";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAvatarFallback, getAvatarUrl } from "@/hooks/use-avatar-url";
import { formatDate } from "@/lib/date-utils";
import { formatFileSize } from "@/lib/file-utils";
import { ClientFileType } from "@/schemas/client-file";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<ClientFileType>[] = [
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
    header: "Data de upload",
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  // {
  //   accessorKey: "uploadedBy",
  //   header: "Enviado por",
  //   cell: ({ row }) => (
  //     <div className="flex gap-4 items-center">
  //       <div className="size-8">
  //         <Avatar className="h-8 w-8 rounded-full border-2 border-white">
  //           <AvatarImage src={getAvatarUrl(row.original.uploadedBy.avatar)} />
  //           <AvatarFallback className="rounded-lg">
  //             {getAvatarFallback(row.original.uploadedBy.name)}
  //           </AvatarFallback>
  //         </Avatar>
  //       </div>
  //       <div>
  //         <h4 className="font-semibold text-neutral-700">
  //           {row.original.uploadedBy.name}
  //         </h4>
  //         <p className="text-xs font-semibold text-neutral-500">
  //           {row.original.uploadedBy.email}
  //         </p>
  //       </div>
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const onDownloadCaseFile = async (caseFileId: string) => {
        try {
          const [fileData] = await downloadCaseFile({ caseFileId });
          if (!fileData) return;

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
          console.log("FilesTableColumns - onDownloadCaaseFile: ", error);
        }
      };

      const onDeleteCaseFile = async (id: string) => {
        try {
          await deleteCaseFile(id);
          toast.success("Arquivo apagado com sucesso!");
          revalidate(window.location.pathname);
        } catch (error) {
          console.log("FilesTableColumns - onDeleteCaseFile: ", error);
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
            <DropdownMenuContent align="end" className="flex flex-col gap-0.5">
              <DropdownMenuItem asChild>
                <Button
                  variant="outline"
                  onClick={async () =>
                    await onDownloadCaseFile(row.original.id)
                  }
                  className="focus-visible:ring-0"
                >
                  <Download />
                  Fazer download
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  onClick={async () => await onDeleteCaseFile(row.original.id)}
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
