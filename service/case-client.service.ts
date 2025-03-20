import { ICaseClient, ICreateCaseClient } from "@/interfaces/ICaseClient";
import { Api } from "@/providers";

export const CaseClientService = {
  async createCaseClient(payload: ICreateCaseClient) {
    const { data } = await Api.post<ICaseClient>("case-client", payload);
    return data;
  },
};
