"use server";

import {
  ICreateDocumentModel,
  IDocumentModel,
} from "@/interfaces/IDocumentModel";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createDocumentModel = async (
  body: ICreateDocumentModel
): Promise<IDocumentModel | null> => {
  try {
    const allCookies = await cookies();
    const access_token = allCookies.get("access_token")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/document-model/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao criar documento: ${response.statusText}`);
    }

    const documentModel: IDocumentModel = await response.json();

    revalidatePath("/app/documents");
    return documentModel;
  } catch (error) {
    console.error("Action - CreateDocumentModel: ", error);
    return null;
  }
};
