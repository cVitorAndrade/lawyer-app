"use client";

import { useTransition } from "react";
import { deleteDocumentModel } from "@/actions/document-model/delete-document-model";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IDocumentModel } from "@/interfaces/IDocumentModel";

import {
  Download,
  EllipsisVertical,
  Folder,
  FolderOpen,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface LawyerDocumentModelsSectionProps {
  documentModels: IDocumentModel[];
}

export default function LawyerDocumentModelsSection({
  documentModels,
}: LawyerDocumentModelsSectionProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {documentModels.map(({ id, title, description, color, files }) => (
        <div key={id} className="rounded-lg shadow-lg border border-primary/25">
          <div
            className="p-2 rounded-t-lg flex flex-col gap-4 cursor-pointer"
            style={{ background: color }}
            onClick={() => router.push(`/app/documents/${id}`)}
          >
            <div className="flex items-center justify-between">
              <div className="bg-white rounded-full size-8 flex justify-center items-center shadow-md shadow-neutral-500">
                <Folder size={18} className="text-neutral-500" />
              </div>

              <Badge variant="secondary">{files.length} Documentos</Badge>
            </div>

            <div className="text-white flex flex-col gap-2 h-20">
              <h3 className="font-semibold truncate overflow-hidden whitespace-nowrap">
                {title}
              </h3>
              <p className="text-sm font-medium line-clamp-2">{description}</p>
            </div>
          </div>

          <div className="bg-white flex justify-between items-center py-4 px-2 rounded-b-lg">
            <div>
              <Button size="sm" variant="outline">
                <Download /> Baixar arquivos
              </Button>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                  <EllipsisVertical className="cursor-pointer" size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1 flex flex-col gap-0.5">
                <Button
                  className="w-full justify-start text-primary"
                  variant="outline"
                  onClick={() => router.push(`/app/documents/${id}`)}
                >
                  <FolderOpen />
                  Abrir modelo
                </Button>

                <Button
                  className="w-full justify-start  text-red-600"
                  variant="outline"
                  onClick={() => startTransition(() => deleteDocumentModel(id))}
                  disabled={isPending}
                >
                  <Trash /> {isPending ? "Apagando..." : "Apagar modelo"}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
}
