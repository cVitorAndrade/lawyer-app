import { ILawyer } from "./ILawyer";

export interface ICreateCaseLawyer {
  caseId: string;
  lawyers: ILawyer[];
}

export interface ICaseLawyer extends ICreateCaseLawyer {
  id: string;
  createdAt: string;
}
