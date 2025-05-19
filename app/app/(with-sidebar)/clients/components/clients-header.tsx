import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddNewClient from "./add-new-client";

export default function ClientsHeader() {
  return (
    <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">Clientes</h2>
        <p className="text-sm text-neutral-600">
          Gerencie de forma centralizada todos os seus clientes. Mantenha os
          dados organizados, acesse rapidamente informações relevantes e otimize
          o acompanhamento de casos. Cadastre novos clientes, atualize
          informações e mantenha um histórico completo para oferecer um
          atendimento mais eficiente e personalizado.
        </p>
      </div>

      <AddNewClient>
        <Button variant="default">
          <Plus />
          Adicionar cliente
        </Button>
      </AddNewClient>
    </div>
  );
}
