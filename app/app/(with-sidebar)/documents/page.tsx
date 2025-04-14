import LawyerDocumentModelsSection from "./lawyer-document-models-section";
import DocumentsHeader from "./documents-header";
import { cookies } from "next/headers";
import { IDocumentModel } from "@/interfaces/IDocumentModel";

export default async function Documents() {
  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  const documentModelsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/document-model`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  const documentModels: IDocumentModel[] = await documentModelsResponse.json();

  return (
    <div className="flex flex-col gap-4">
      <DocumentsHeader />

      <LawyerDocumentModelsSection documentModels={documentModels} />
    </div>
  );
}
