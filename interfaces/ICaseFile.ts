import { ILawyer } from "./ILawyer";

export interface ICaseFile {
  id: string;
  caseId: string;
  uploadedById: string;
  fullpath: string;
  path: string;
  mimetype: string;
  originalname: string;
  size: number;
  createdAt: string;
  uploadedBy: ILawyer;
}
