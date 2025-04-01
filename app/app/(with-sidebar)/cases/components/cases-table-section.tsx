"use client";

import { ICase } from "@/interfaces/ICase";
import CasesTable from "./cases-table";
import { columns } from "./cases-table-columns";
import AddNewCase from "./add-new-case";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CasesTableSectionProps {
  lawyerCases: ICase[];
}
export default function CasesTableSection({
  lawyerCases,
}: CasesTableSectionProps) {
  return (
    <div>
      <div className="flex items-center sm:items-center flex-col sm:flex-row justify-between gap-4 border-b py-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">Meus casos</h2>
          <p className="text-sm text-neutral-600">
            Acompanhe e gerencie todos os seus casos em um só lugar. Veja
            detalhes, adicione documentos e colabore com sua equipe para manter
            tudo organizado.
          </p>
        </div>

        <AddNewCase>
          <Button variant="default" className="w-full sm:w-fit">
            <Plus />
            Criar novo caso
          </Button>
        </AddNewCase>
      </div>

      <CasesTable data={lawyerCases} columns={columns} />
    </div>
  );
}
