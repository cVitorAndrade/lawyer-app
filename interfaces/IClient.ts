import { IAddress } from "./IAddress";

export interface ICreateClient {
  name: string;
  email: string;
  telephone: string;
  birthDate: Date;
}

export interface IClient extends Omit<ICreateClient, "birthDate"> {
  id: string;
  birthDate: string;
  address: IAddress;
  createdAt: string;
  updatedAt: string;
}
