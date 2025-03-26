"use client";
import FileDropzone from "@/components/file-dropzone";
import { FileToUpload } from "@/components/file-to-upload";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatFileSize } from "@/lib/file-utils";
import { UploadService } from "@/service/upload.service";
import { CircleHelp } from "lucide-react";
import { HTMLAttributes, ReactNode, useState } from "react";
import { toast } from "sonner";

interface UploadNewCaseFileProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  caseId: string;
}

interface FileToUpload {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "success" | "error";
}

export default function UploadNewCaseFile({
  children,
  caseId,
}: UploadNewCaseFileProps) {
  const [filesToUpload, setFilesToUpload] = useState<FileToUpload[]>([]);

  const updateFileStatus = (fileId: string, updates: Partial<FileToUpload>) => {
    setFilesToUpload((prevFiles) =>
      prevFiles.map((f) => (f.id === fileId ? { ...f, ...updates } : f))
    );
  };

  const onUploadCaseFiles = async () => {
    try {
      await Promise.all(
        filesToUpload
          .filter(({ status }) => status !== "success")
          .map(async ({ file, id }) => {
            updateFileStatus(id, { status: "pending", progress: 0 });

            try {
              await UploadService.uploadCaseFile(caseId, file, (progress) =>
                updateFileStatus(id, { progress })
              );
              updateFileStatus(id, { status: "success" });
              toast.success(`O arquivo ${file.name} foi enviado com sucesso!`);
            } catch {
              updateFileStatus(id, { status: "error" });
            }
          })
      );
    } catch (error) {
      console.error("UploadNewCaseFile - onUploadCaseFiles: ", error);
    }
  };

  const onRemoveFile = (fileId: string) => {
    const updatedFiles = filesToUpload.filter(({ id }) => fileId !== id);
    setFilesToUpload(updatedFiles);
  };

  return (
    <Modal.Root>
      <Modal.OpenButton>{children}</Modal.OpenButton>
      <Modal.Container className="max-w-xl max-h-full ring-0 border-none md:max-h-[95%] overflow-auto p-4 sm:p-6">
        <Modal.Header>
          <Modal.Title text="Enviar Arquivos para o Caso" />
          <Modal.Description text="Faça upload de documentos e arquivos relevantes para este caso. Todos os membros terão acesso aos arquivos enviados." />
        </Modal.Header>

        <div className="flex flex-col gap-4">
          <FileDropzone setFilesToUpload={setFilesToUpload} />

          <ScrollArea className="sm:max-h-[18rem]">
            <div className="flex flex-col gap-2 sm:px-2">
              {filesToUpload.map(({ id, file, progress, status }) => (
                <FileToUpload.Root key={id} status={status}>
                  <FileToUpload.Thumbnail
                    imageUrl={URL.createObjectURL(file)}
                  />
                  <FileToUpload.DetailsSection>
                    <FileToUpload.Header>
                      <FileToUpload.Title>
                        <FileToUpload.Name text={file.name} />
                        <FileToUpload.Size size={formatFileSize(file.size)} />
                      </FileToUpload.Title>

                      {status === "pending" ? (
                        <FileToUpload.RemoveButton
                          onClick={() => onRemoveFile(id)}
                        />
                      ) : (
                        <FileToUpload.StatusIcon status={status} />
                      )}
                    </FileToUpload.Header>

                    <FileToUpload.Progress percentage={progress} />
                  </FileToUpload.DetailsSection>
                </FileToUpload.Root>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Modal.Footer>
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full gap-4">
            <div>
              <Button variant="link" className="text-neutral-500">
                <CircleHelp />
                Precisa de ajuda?
              </Button>
            </div>
            <div className="flex gap-4">
              <Modal.CloseButton asChild>
                <Button variant="outline">Cancelar</Button>
              </Modal.CloseButton>
              <Button onClick={onUploadCaseFiles}>Fazer upload</Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Root>
  );
}
