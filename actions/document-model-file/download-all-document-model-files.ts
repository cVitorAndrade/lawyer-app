"use server";

import { cookies } from "next/headers";

export const downloadAllDocumentModelFiles = async (id: string) => {
  try {
    const allCookies = await cookies();
    const access_token = allCookies.get("access_token")?.value;

    const response = await fetch(
      `${process.env.API_URL}/document-model-file/download/all/files/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao baixar os arquivos: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    const contentDisposition = response.headers.get("Content-Disposition");
    const filenameMatch = contentDisposition?.match(/filename="(.+?)"/);
    const filename = filenameMatch ? filenameMatch[1] : "arquivo_desconhecido";

    return { buffer, contentType, filename };
  } catch (error) {
    console.log("Action - downloadAllDocumentModelFiles: ", error);
  }
};
