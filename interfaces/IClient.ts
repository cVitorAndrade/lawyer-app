export interface ICreateClient {
  name: string;
  email: string;
  telephone: string;
  birthDate: Date;
}

export interface IClient extends ICreateClient {
  id: string;
  createdAt: string;
  updatedAt: string;
}
