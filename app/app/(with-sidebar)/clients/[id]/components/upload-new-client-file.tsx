import { uploadClientFile } from "@/actions/client-file/upload-client-file";
import { revalidate } from "@/actions/revalidate-path";
import FileDropzone from "@/components/file-dropzone";
import { FileToUpload } from "@/components/file-to-upload";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatFileSize } from "@/lib/file-utils";
import { CircleHelp } from "lucide-react";
import { usePathname } from "next/navigation";
import { HTMLAttributes, ReactNode, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

interface UploadNewClientFileProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  clientId: string;
}

interface FileToUpload {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "success" | "error";
}

export default function UploadNewClientFile({
  children,
  clientId,
}: UploadNewClientFileProps) {
  const pathname = usePathname();

  const [filesToUpload, setFilesToUpload] = useState<FileToUpload[]>([]);

  const { execute: executeUploadClientFile } =
    useServerAction(uploadClientFile);

  const onRemoveFile = (fileId: string) => {
    const updatedFiles = filesToUpload.filter(({ id }) => fileId !== id);
    setFilesToUpload(updatedFiles);
  };

  const updateFileStatus = (fileId: string, updates: Partial<FileToUpload>) => {
    setFilesToUpload((prevFiles) =>
      prevFiles.map((f) => (f.id === fileId ? { ...f, ...updates } : f))
    );
  };

  const onUploadClientFiles = async () => {
    for (const { file, id } of filesToUpload.filter(
      ({ status }) => status !== "success"
    )) {
      updateFileStatus(id, { status: "pending", progress: 0 });

      try {
        await executeUploadClientFile({ clientId, file });
        updateFileStatus(id, { status: "success", progress: 100 });
        toast.success(`O arquivo ${file.name} foi enviado com sucesso!`);
      } catch (error) {
        updateFileStatus(id, { status: "error", progress: 0 });
        console.log("UploadNewCaseFile - onUploadCaseFiles: ", error);
      }
    }

    await revalidate(pathname);
  };

  return (
    <Modal.Root>
      <Modal.OpenButton>{children}</Modal.OpenButton>

      <Modal.Container className="max-w-2xl w-full overflow-auto max-h-full">
        <Modal.Header>
          <Modal.Title text="Anexar arquivos ao perfil do cliente" />
          <Modal.Description text="Selecione e envie documentos importantes relacionados a este cliente. Você pode anexar arquivos como RG, CPF, comprovantes ou outros documentos relevantes. show" />
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
              <Button onClick={onUploadClientFiles}>Fazer upload</Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Root>
  );
}
