import { cookies } from "next/headers";
import DataTable from "./document-model-files-table";
import { IDocumentModel } from "@/interfaces/IDocumentModel";
import DocumentModelFilesSection from "./document-model-files-sections";
import DocumentModelDetailsSection from "./document-model-details-section";
import { Separator } from "@/components/ui/separator";

export default async function DocumentModelDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  const documentModelResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/document-model/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  const documentModel: IDocumentModel = await documentModelResponse.json();

  return (
    <div className="flex flex-col gap-4">
      <DocumentModelDetailsSection documentModel={documentModel} />
      <DocumentModelFilesSection documentModel={documentModel} />
    </div>
  );
}
