import { Api } from "@/providers";

export const UploadService = {
  async uploadCaseFile(
    caseId: string,
    file: File,
    onProgress: (progress: number) => void
  ) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await Api.post(`upload/cases/${caseId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (event.total) {
          const progress = Math.round((event.loaded * 100) / event.total);
          onProgress(progress);
        }
      },
    });
    return data;
  },

  async uploadDocumentFile(
    documentModelId: string,
    file: File,
    onProgress: (progress: number) => void
  ) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await Api.post(
      `upload/document-model/${documentModelId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (event.total) {
            const progress = Math.round((event.loaded * 100) / event.total);
            onProgress(progress);
          }
        },
      }
    );
    return data;
  },
};
