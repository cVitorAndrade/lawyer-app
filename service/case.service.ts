import { ICase, ICreateCase } from "@/interfaces/ICase";
import { Api } from "@/providers";

export const CaseService = {
  async createCase(payload: ICreateCase) {
    const { data } = await Api.post<ICase>("case", payload);
    return data;
  },

  async getAllCases() {
    const { data } = await Api.get<ICase[]>("case/all");
    return data;
  },

  async getAllLawyerCases() {
    const { data } = await Api.get<ICase[]>("case");
    return data;
  },
};
