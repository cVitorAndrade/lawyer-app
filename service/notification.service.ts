import { Api } from "@/providers";

export const NotificationService = {
  async getAllLawyerNotifications() {
    const { data } = await Api.get<INotification[]>("notification/lawyer");
    return data;
  },
};
