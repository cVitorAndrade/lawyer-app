"use client";
import { IDocumentModel } from "@/interfaces/IDocumentModel";
import DataTable from "./document-model-files-table";
import { columns } from "./document-model-files-table-columns";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

interface DocumentModelFilesSectionProps {
  documentModel: IDocumentModel;
}

export default function DocumentModelFilesSection({
  documentModel,
}: DocumentModelFilesSectionProps) {
  const { files } = documentModel;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Documentos anexados</h3>
          <p className="text-neutral-500">
            Você pode visualizar e gerenciar os arquivos associados a este
            modelo de documento. Todos os arquivos vinculados ficam armazenados
            aqui, permitindo fácil acesso, download e atualização conforme
            necessário.
          </p>
        </div>

        {/* <Button>
          <Download /> Baixar tudo
        </Button> */}
      </div>

      <DataTable columns={columns} data={files} />
    </div>
  );
}
