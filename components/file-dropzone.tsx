import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, File, FileImage, FileText, Trash2 } from 'lucide-react';

function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(fileType: string) {
  if (fileType.startsWith('image/')) {
    return <FileImage size={16} />;
  } else if (fileType === 'application/pdf') {
    return <FileText size={16} />;
  }
  return <File size={16} />;
}

type UploadedFile = {
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number; // 0 to 100
};

export default function FileDropzone() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleUpload = async (file: File, index: number) => {
    const uploadEndpoint = 'https://file.io'; // Replace with your API endpoint

    try {
      const formData = new FormData();
      formData.append('file', file);

      setUploadedFiles((prev) => {
        const updatedFiles = [...prev];
        updatedFiles[index].status = 'uploading';
        return updatedFiles;
      });

      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadedFiles((prev) => {
          const updatedFiles = [...prev];
          updatedFiles[index].status = 'success';
          updatedFiles[index].progress = 100;
          return updatedFiles;
        });
      } else {
        setUploadedFiles((prev) => {
          const updatedFiles = [...prev];
          updatedFiles[index].status = 'error';
          return updatedFiles;
        });
      }
    } catch {
      setUploadedFiles((prev) => {
        const updatedFiles = [...prev];
        updatedFiles[index].status = 'error';
        return updatedFiles;
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      status: 'uploading',
      progress: 0,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file, index) => {
      handleUpload(file.file, uploadedFiles.length + index);
    });
  }, [uploadedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.svg', '.png', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-all hover:bg-primary-foreground cursor-pointer duration-500 ${
          isDragActive
            ? 'bg-primary-foreground border-primary-500'
            : 'bg-neutral-200/50 border-neutral-300'
        }`}
      >
        <div className="rounded-full size-10 mb-3 bg-neutral-300/50 flex justify-center items-center">
          <CloudUpload className="text-neutral-600" />
        </div>
        <p className="text-center text-neutral-600 text-sm">
          <span className="font-semibold">Click to upload</span> or drag and drop
          <br />
          <span className="text-sm text-neutral-500">SVG, PNG, JPEG, GIF, WEBP, PDF</span>
        </p>
        <input {...getInputProps()} />
      </div>

      <div className="space-y-4 mt-4">
        {uploadedFiles.map((uploadedFile, index) => (
          <div
            key={index}
            className="flex justify-between p-4 border rounded-lg bg-neutral-50 gap-4"
          >
            <div className="self-center rounded-full p-2 bg-neutral-200">
              {getFileIcon(uploadedFile.file.type)}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-1">
                <p className="text-neutral-700 text-sm">{uploadedFile.file.name}</p>
                <p className="text-xs text-neutral-500">{formatFileSize(uploadedFile.file.size)}</p>
              </div>

              <div className="h-2 bg-neutral-300 rounded-full overflow-hidden">
                <div
                  className={`h-2 ${
                    uploadedFile.status === 'error'
                      ? 'bg-red-500'
                      : uploadedFile.status === 'success'
                      ? 'bg-neutral-800'
                      : 'bg-primary-foreground'
                  }`}
                  style={{ width: `${uploadedFile.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}