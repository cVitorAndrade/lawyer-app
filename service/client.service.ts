import { IClient, ICreateClient } from "@/interfaces/IClient";
import { Api } from "@/providers";

export const ClientService = {
  async createClient(payload: ICreateClient) {
    const { data } = await Api.post<IClient>("client", payload);
    return data;
  },
};
