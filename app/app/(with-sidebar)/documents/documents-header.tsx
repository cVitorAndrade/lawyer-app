"use client";
import { Plus } from "lucide-react";
import AddNewDocumentModel from "./add-new-document-model";
import { Button } from "@/components/ui/button";

export default function DocumentsHeader() {
  return (
    <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">Modelos de documentos</h2>
        <p className="text-sm text-neutral-600">
          Centralize e gerencie seus modelos de documentos para agilizar a
          criação de petições, contratos e outros arquivos essenciais. Faça
          upload dos seus modelos personalizados e utilize-os sempre que
          necessário para padronizar e otimizar seu fluxo de trabalho.
        </p>
      </div>

      <AddNewDocumentModel>
        <Button variant="default">
          <Plus />
          Adicionar modelo
        </Button>
      </AddNewDocumentModel>
    </div>
  );
}
