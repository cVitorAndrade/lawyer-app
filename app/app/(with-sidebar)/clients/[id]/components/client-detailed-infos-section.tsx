"use client";

import ClientFilesTable from "./client-files-table";
import { columns } from "./client-files-table-columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddNewDependent from "./add-new-dependent";
import { ClientType } from "@/schemas/client";
import ClientDependentsSection from "./client-dependents-section";

interface ClientDetailedInfosSectionProps {
  client: ClientType;
}

export default function ClientDetailedInfosSection({
  client,
}: ClientDetailedInfosSectionProps) {
  console.log({ client });
  return (
    <div className="col-span-3 flex flex-col gap-4 h-full shadow-md rounded-lg border p-2">
      <div>
        <h3>Documentos do cliente</h3>
        <ClientFilesTable data={[]} columns={columns} />
      </div>

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
