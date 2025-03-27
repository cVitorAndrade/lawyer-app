"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteDocumentModel(id: string) {
  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  await fetch(`${process.env.API_URL}/document-model/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  revalidatePath("/app/documents");
}
