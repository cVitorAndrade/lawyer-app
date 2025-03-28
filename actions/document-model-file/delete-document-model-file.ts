"use server"

import { cookies } from "next/headers";

export const deleteDocumentModelFile = async (id: string) => {
  try {
    const allCookies = await cookies();
      const access_token = allCookies.get("access_token")?.value;
    
      await fetch(`${process.env.API_URL}/document-model-file/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  } catch (error) {
    console.log("Action - deleteDocumentModelFile: ", error);
  }
}