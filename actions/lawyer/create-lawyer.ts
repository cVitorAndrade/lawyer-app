"use server";

import { ICreateLawyer, ILawyer } from "@/interfaces/ILawyer";
import { cookies } from "next/headers";

export const createLawyer = async (body: ICreateLawyer) => {
  try {
    const allCookies = await cookies();
    const access_token = allCookies.get("access_token")?.value;

    const response = await fetch(`${process.env.API_URL}/lawyer/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok)
      throw new Error(`Erro ao criar advogado: ${response.statusText}`);

    const lawyer: ILawyer = await response.json();
    return lawyer;
  } catch (error) {
    console.log("Action - createLawyer: ", error);
    return null;
  }
};
