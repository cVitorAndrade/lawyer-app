"use client";
import UploadNewCaseFile from "./upload-new-case-file";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "./files-table";
import { columns } from "./files-table-columns";
import { ICaseFile } from "@/interfaces/ICaseFile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CaseFilesSectionProps {
  caseFiles: ICaseFile[];
  caseId: string;
}

export default function CaseFilesSection({
  caseFiles,
  caseId,
}: CaseFilesSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>Documentos</CardTitle>
          <CardDescription>
            Arquivos e documentos que foram adicionados a este caso.
          </CardDescription>
        </div>

        <UploadNewCaseFile caseId={caseId}>
          <Button>
            <Plus /> Adicionar arquivo
          </Button>
        </UploadNewCaseFile>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={caseFiles} />
      </CardContent>
    </Card>
  );
}
