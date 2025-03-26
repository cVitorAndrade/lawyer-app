import { IDocumentModelFile } from "./IDocumentModelFile";

export interface ICreateDocumentModel {
  title: string;
  description: string;
  color: string;
}

export interface IDocumentModel extends ICreateDocumentModel {
  id: string;
  files: IDocumentModelFile[];
  createdAt: string;
}
