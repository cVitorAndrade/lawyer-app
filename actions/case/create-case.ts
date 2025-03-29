"use server";

import { ICase, ICreateCase } from "@/interfaces/ICase";
import { cookies } from "next/headers";

export const createCase = async (body: ICreateCase): Promise<ICase | null> => {
  try {
    const allCookies = await cookies();
    const access_token = allCookies.get("access_token")?.value;

    const response = await fetch(`${process.env.API_URL}/case/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok)
      throw new Error(`Erro ao criar caso: ${response.statusText}`);

    const caseItem: ICase = await response.json();
    return caseItem;
  } catch (error) {
    console.log("Action - createCase: ", error);
    return null;
  }
};
