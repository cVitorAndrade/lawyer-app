import {
  ICreateDocumentModel,
  IDocumentModel,
} from "@/interfaces/IDocumentModel";
import { Api } from "@/providers";

export const DocumentModelService = {
  async createDocumentModel(payload: ICreateDocumentModel) {
    const { data } = await Api.post<IDocumentModel>("/document-model", payload);
    return data;
  },
};
