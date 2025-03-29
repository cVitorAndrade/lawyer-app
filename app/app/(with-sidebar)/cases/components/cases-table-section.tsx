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
      <div className="flex items-center justify-between gap-4 border-b py-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">Your Cases</h2>
          <p className="text-sm text-neutral-600">
            Keep track of the cases you are involved in. Find detailed
            information and updates on each process in a practical and organized
            way
          </p>
        </div>

        <AddNewCase>
          <Button variant="default">
            <Plus />
            Criar novo caso
          </Button>
        </AddNewCase>
      </div>

      <CasesTable data={lawyerCases} columns={columns} />
    </div>
  );
}
