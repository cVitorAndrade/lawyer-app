import { ICase, ICreateCase } from "@/interfaces/ICase";
import { Api } from "@/providers";

export const CaseService = {
  async createCase(payload: ICreateCase) {
    const { data } = await Api.post<ICase>("case", payload);
    return data;
  },
};
