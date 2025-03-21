import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { randomUUID } from "crypto";

interface FileToUpload {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "success" | "error";
}

interface FileDropzoneProps {
  setFilesToUpload: React.Dispatch<React.SetStateAction<FileToUpload[]>>;
}

export default function FileDropzone({ setFilesToUpload }: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: FileToUpload[] = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: "pending",
      }));

      setFilesToUpload((prev) => [...prev, ...newFiles]);
    },
    [setFilesToUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".svg", ".png", ".jpeg", ".gif", ".webp"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-all hover:bg-primary-foreground cursor-pointer duration-500 ${
          isDragActive
            ? "bg-primary-foreground border-primary-500"
            : "bg-neutral-200/50 border-neutral-300"
        }`}
      >
        <div className="rounded-full size-10 mb-3 bg-neutral-300/50 flex justify-center items-center">
          <CloudUpload className="text-neutral-600" />
        </div>
        <p className="text-center text-sm">
          <span className="">Arraste e solte aqui seus arquivos</span>
          <br />
          <span className="text-sm text-neutral-500">
            ou, clique para buscar arquivos (50MB max)
          </span>
        </p>
        <input {...getInputProps()} />
      </div>
    </div>
  );
}
