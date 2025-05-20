"use client";

import ClientFilesTable from "./client-files-table";
import { columns } from "./client-files-table-columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddNewDependent from "./add-new-dependent";
import { ClientType } from "@/schemas/client";
import ClientDependentsSection from "./client-dependents-section";
import { Separator } from "@/components/ui/separator";
import UploadNewClientFile from "./upload-new-client-file";

interface ClientDetailedInfosSectionProps {
  client: ClientType;
}

export default function ClientDetailedInfosSection({
  client,
}: ClientDetailedInfosSectionProps) {
  return (
    <div className="col-span-3 flex flex-col gap-12 h-full shadow-md rounded-lg border p-2">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Arquivos do cliente</h2>
            <p className="text-sm text-neutral-600">
              Arquivos e documentos adicionados a este cliente
            </p>
          </div>

          <UploadNewClientFile clientId={client.id}>
            <Button variant="default">
              <Plus />
              Adicionar arquivo
            </Button>
          </UploadNewClientFile>
        </div>

        <ClientFilesTable data={[]} columns={columns} />
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Dependentes do cliente</h2>
            <p className="text-sm text-neutral-600">
              Consulte os dependentes vinculados ao cliente e visualize
              rapidamente suas informações essenciais, facilitando o
              entendimento completo do contexto familiar no caso.
            </p>
          </div>

          <AddNewDependent clientAddress={client.address} clientId={client.id}>
            <Button variant="default">
              <Plus />
              Adicionar dependente
            </Button>
          </AddNewDependent>
        </div>

        <ClientDependentsSection dependents={client.dependents} />
      </div>
    </div>
  );
}
