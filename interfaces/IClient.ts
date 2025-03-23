import { IAddress } from "./IAddress";

export interface ICreateClient {
  name: string;
  email: string;
  telephone: string;
  birthDate: string;
}

export interface IClient extends ICreateClient {
  id: string;
  address: IAddress;
  createdAt: string;
  updatedAt: string;
}
