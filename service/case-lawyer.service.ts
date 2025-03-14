import { ICaseLawyer, ICreateCaseLawyer } from "@/interfaces/ICaseLawyer";
import { Api } from "@/providers";

export const CaseLawyerService = {
  async createCaseLawyers(payload: ICreateCaseLawyer) {
    const { data } = await Api.post<ICaseLawyer>("/case-lawyer", payload);
    return data;
  },
};
