export interface ICreateCaseClient {
  caseId: string;
  clientId: string;
}

export interface ICaseClient extends ICreateCaseClient {
  id: string;
  createdAt: string;
}
