"use server";
import { authenticatedProcedure } from "@/lib/zsa-procedures";

export const getNotifications = authenticatedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    try {
      const response = await ctx.fetch("/notification/lawyer");
      return await response.json();
    } catch (error) {
      console.log("Action - GetNotification: ", error);
    }
  });
