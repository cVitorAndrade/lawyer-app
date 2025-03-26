import FileDropzone from "@/components/file-dropzone";
import { FileToUpload } from "@/components/file-to-upload";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatFileSize } from "@/lib/file-utils";
import { CircleHelp } from "lucide-react";
import { useState } from "react";

interface UploadDocumentModelFileProps {
  onPreviousStep: () => void;
  onFinish: () => Promise<void>;
  filesToUpload: FileToUpload[];
  setFilesToUpload: React.Dispatch<React.SetStateAction<FileToUpload[]>>;
}

interface FileToUpload {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "success" | "error";
}

export default function UploadDocumentModelFile({
  onPreviousStep,
  onFinish,
  filesToUpload,
  setFilesToUpload,
}: UploadDocumentModelFileProps) {
  const onRemoveFile = (fileId: string) => {
    const updatedFiles = filesToUpload.filter(({ id }) => fileId !== id);
    setFilesToUpload(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <FileDropzone setFilesToUpload={setFilesToUpload} />

      <ScrollArea className="sm:max-h-[18rem]">
        <div className="flex flex-col gap-2 sm:px-2">
          {filesToUpload.map(({ id, file, progress, status }) => (
            <FileToUpload.Root key={id} status={status}>
              <FileToUpload.Thumbnail imageUrl={URL.createObjectURL(file)} />
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

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full gap-4">
        <div>
          <Button variant="link" className="text-neutral-500">
            <CircleHelp />
            Precisa de ajuda?
          </Button>
        </div>
        <div className="flex gap-4">
          <Button onClick={onPreviousStep}>Voltar</Button>
          <Button onClick={onFinish}>Criar modelo</Button>
        </div>
      </div>
    </div>
  );
}
