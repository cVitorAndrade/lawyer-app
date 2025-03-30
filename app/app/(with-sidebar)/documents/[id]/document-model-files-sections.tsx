"use client";
import { IDocumentModel } from "@/interfaces/IDocumentModel";
import DataTable from "./document-model-files-table";
import { columns } from "./document-model-files-table-columns";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DocumentModelFilesSectionProps {
  documentModel: IDocumentModel;
}

export default function DocumentModelFilesSection({
  documentModel,
}: DocumentModelFilesSectionProps) {
  const { files } = documentModel;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos anexados</CardTitle>
        <CardDescription>
          Você pode visualizar e gerenciar os arquivos associados a este modelo
          de documento. Todos os arquivos vinculados ficam armazenados aqui,
          permitindo fácil acesso, download e atualização conforme necessário.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={files} />
      </CardContent>
    </Card>
  );
}
