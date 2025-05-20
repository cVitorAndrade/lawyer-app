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
import { ClientFileType } from "@/schemas/client-file";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientDetailedInfosSectionProps {
  client: ClientType;
  clientFiles: ClientFileType[];
}

export default function ClientDetailedInfosSection({
  client,
  clientFiles,
}: ClientDetailedInfosSectionProps) {
  return (
    <div className="col-span-3 flex flex-col gap-12 h-full shadow-md rounded-lg border p-2">
      <Card>
        <CardHeader className="flex flex-row justify-between gap-4 items-center">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Arquivos do cliente</CardTitle>
            <CardDescription>
              Arquivos e documentos adicionados a este cliente
            </CardDescription>
          </div>

          <UploadNewClientFile clientId={client.id}>
            <Button variant="default">
              <Plus />
              Adicionar arquivo
            </Button>
          </UploadNewClientFile>
        </CardHeader>

        <CardContent>
          <ClientFilesTable data={clientFiles} columns={columns} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between gap-4 items-center">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Dependentes do cliente</CardTitle>
            <CardDescription>
              Consulte os dependentes vinculados ao cliente e visualize
              rapidamente suas informações essenciais, facilitando o
              entendimento completo do contexto familiar no caso.
            </CardDescription>
          </div>

          <AddNewDependent clientAddress={client.address} clientId={client.id}>
            <Button variant="default">
              <Plus />
              Adicionar dependente
            </Button>
          </AddNewDependent>
        </CardHeader>

        <CardContent>
          <ClientDependentsSection dependents={client.dependents} />
        </CardContent>
      </Card>
    </div>
  );
}
