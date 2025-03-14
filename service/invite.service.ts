import { ICreateInvite, IInvite } from "@/interfaces/IInvite";
import { Api } from "@/providers";

export const InviteService = {
  async createInvites(payload: ICreateInvite) {
    const { data } = await Api.post<IInvite[]>("invite", payload);
    return data;
  },

  async getAllLawyerInvites() {
    const { data } = await Api.get<IInvite[]>("invite/lawyer");
    return data;
  },

  async acceptCaseInvition(inviteId: string) {
    const { data } = await Api.patch<IInvite>(`invite/accept/${inviteId}`);
    return data;
  },

  async rejectCaseInvitation(inviteId: string) {
    const { data } = await Api.patch<IInvite>(`invite/reject/${inviteId}`);
    return data
  },
};
