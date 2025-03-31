import { IClient } from "./IClient";
import { ILawyer } from "./ILawyer";

export type CaseType = "ADMINISTRATIVE" | "JUDICIAL";
export type CasePriority = "LOW" | "MEDIUM" | "HIGH";
export type CaseStatus = "IN_PROGRESS" | "FINISHED" | "CANCELED" | "PAUSED";

export interface ICreateCase {
  title: string;
  description: string;
  type: CaseType;
  priority: CasePriority;
  status: CaseStatus;
}

export interface ICase extends ICreateCase {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: ILawyer;
  lawyers: ILawyer[];
  clients: IClient[];
}
