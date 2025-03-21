"use client";
import UploadNewCaseFile from "./upload-new-case-file";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "./files-table";
import { columns } from "./files-table-columns";
import { ICaseFile } from "@/interfaces/ICaseFile";

interface CaseFilesSectionProps {
  caseFiles: ICaseFile[];
  caseId: string;
}

export default function CaseFilesSection({
  caseFiles,
  caseId,
}: CaseFilesSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Documentos</h3>
          <p className="text-neutral-500">
            Arquivos e documentos que foram adicionados a este caso.
          </p>
        </div>

        <UploadNewCaseFile caseId={caseId}>
          <Button>
            <Plus /> Adicionar arquivo
          </Button>
        </UploadNewCaseFile>
      </div>

      <DataTable columns={columns} data={caseFiles} />
    </div>
  );
}
