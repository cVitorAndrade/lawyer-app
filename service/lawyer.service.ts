import { ICreateLawyer, ILawyer } from "@/interfaces/ILawyer";
import { Api } from "@/providers/api";

export const LawyerService = {
  async createLawyer(payload: ICreateLawyer) {
    const { data } = await Api.post<ILawyer>("/lawyer", payload);
    return data;
  },
};
