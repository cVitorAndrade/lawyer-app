"use server";

import { cookies } from "next/headers";

export const deleteCase = async (id: string) => {
  try {
    const allCookies = await cookies();
    const access_token = allCookies.get("access_token")?.value;

    await fetch(`${process.env.API_URL}/case/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    console.log("Action - DeleteCase: ", error);
  }
};
