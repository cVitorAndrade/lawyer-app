export interface ICreateAddress {
  ownerId: string;
  name: string;
  country: string;
  postalCode: string;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
  number: string;
  complement: string;
}

export interface IAddress extends ICreateAddress {
  id: string;
  createdAt: string;
  updatedAt: string;
}
