import { ICreateLawyer, ILawyer } from "@/interfaces/ILawyer";
import { Api } from "@/providers";

export const LawyerService = {
  async createLawyer(payload: ICreateLawyer) {
    const { data } = await Api.post<ILawyer>("/lawyer", payload);
    return data;
  },

  async getLawyer() {
    const { data } = await Api.get<ILawyer>("lawyer");
    return data;
  },

  async getAllLawyers() {
    const { data } = await Api.get<ILawyer[]>("/lawyer/all");
    return data;
  },
};
