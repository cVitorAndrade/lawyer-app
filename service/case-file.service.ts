import { Api } from "@/providers";

export const CaseFileService = {
  async downloadCaseFile(id: string) {
    return await Api.get(`/case-file/download/file/${id}`, {
      responseType: "blob",
    });
  },
};
