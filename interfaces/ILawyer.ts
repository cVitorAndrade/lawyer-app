export interface ICreateLawyer {
  email: string;
  name: string;
  username: string;
  password: string;
  telephone?: string;
}

export interface ILawyer extends ICreateLawyer {
  id: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
