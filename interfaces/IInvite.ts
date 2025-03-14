import { ILawyer } from "./ILawyer";

export interface ICreateInvite {
  caseId: string;
  lawyers: ILawyer[];
}

type InviteStatus = "pending" | "accepted" | "rejected";

export interface IInvite extends ICreateInvite {
  id: string;
  invitedById: string;
  invitedId: string;
  status: InviteStatus;
  createdAt: string;
  respondedAt: string | null;
}
