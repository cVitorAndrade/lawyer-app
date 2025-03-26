import { Separator } from "@/components/ui/separator";
import { IDocumentModel } from "@/interfaces/IDocumentModel";
import { formatDate } from "@/lib/date-utils";
import { Calendar, File, FolderOpen, PaintBucket } from "lucide-react";

interface DocumentModelDetailsSectionProps {
  documentModel: IDocumentModel;
}

export default function DocumentModelDetailsSection({
  documentModel,
}: DocumentModelDetailsSectionProps) {
  const { files } = documentModel;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative mb-6 flex flex-col gap-2 pb-14 text-white p-2 rounded-t-md"
        style={{ background: documentModel.color }}
      >
        <h1 className="text-xl font-semibold">{documentModel.title}</h1>
        <p className="font-medium">{documentModel.description}</p>

        <div className="absolute -bottom-4 bg-white shadow-primary shadow-sm rounded-full text-neutral-500 size-14 flex justify-center items-center border-2">
          <FolderOpen size={26} />
        </div>
      </div>

      <Separator />

      <div className="px-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center sm:gap-4 flex-wrap gap-1">
            <div className="flex items-center gap-2 text-neutral-500">
              <File size={18} />
              <span className="font-medium">N° de arquivos:</span>
            </div>

            <div>
              <span className="font-medium">
                {files.length} arquivo{files.length !== 1 && "s"}
              </span>
            </div>
          </div>

          <div className="flex items-center sm:gap-4 flex-wrap gap-1">
            <div className="flex items-center gap-2 text-neutral-500">
              <PaintBucket size={18} />
              <span className="font-medium">Cor:</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="size-4"
                style={{ background: documentModel.color }}
              ></div>

              <span className="font-medium">{documentModel.color}</span>
            </div>
          </div>

          <div className="flex items-center sm:gap-4 flex-wrap gap-1">
            <div className="flex items-center gap-2 text-neutral-500">
              <Calendar size={18} />
              <span className="font-medium">Data de criação:</span>
            </div>

            <div>
              <span className="font-medium">
                {formatDate(documentModel.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
