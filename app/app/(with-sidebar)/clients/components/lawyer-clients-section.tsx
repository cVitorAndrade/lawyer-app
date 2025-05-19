"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAvatarFallback } from "@/hooks/use-avatar-url";
import { formatDate } from "@/lib/date-utils";
import { ClientType } from "@/schemas/client";
import {
  ArrowUpRight,
  Calendar,
  Download,
  EllipsisVertical,
  FolderOpen,
  IdCard,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface LawyerClientsSectionProps {
  clients: ClientType[];
}

export default function LawyerClientsSection({
  clients,
}: LawyerClientsSectionProps) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-4 gap-4">
      {clients.map(({ id, name, occupation, birthDate, dependents, cases }) => (
        <div
          className="border rounded-lg shadow-md p-2 flex flex-col gap-4"
          key={id}
        >
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/maykbrito.png" />
              <AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-lg font-medium">Carlos Vitor</h2>
              <div className="text-neutral-500 text-xs flex gap-2">
                <div>
                  <div className="flex gap-2 items-center">
                    <IdCard size={14} /> <span>{occupation}</span>
                  </div>
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <Calendar size={14} /> <span>{formatDate(birthDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm text-neutral-700 font-semibold">Detalhes</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">0 Documentos</Badge>
              <Badge variant="secondary">{dependents.length} dependentes</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm text-neutral-700 font-semibold">
              Casos atuais{" "}
              <span className="text-xs text-neutral-500">({cases.length})</span>
            </h3>
            <div className="flex gap-2 flex-wrap">
              {cases.map(({ id, title }) => (
                <Badge className="w-fit" key={id}>
                  {title}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white mt-auto flex justify-between items-center rounded-b-lg">
            <div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/app/clients/${id}`) }
                // onClick={() =>
                //   startDownloadTransition(
                //     async () => await onDonwloadAllDocumentModelFiles(id)
                //   )
                // }
                // disabled={isDownloading}
              >
                <ArrowUpRight />{" "}
                {/* {isDownloading ? "Baixando arquivos..." : "Baixar arquivos"} */}
                Ver mais detalhes
              </Button>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                  <EllipsisVertical className="cursor-pointer" size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1 flex flex-col gap-0.5">
                <Button
                  className="w-full justify-start text-primary"
                  variant="outline"
                  // onClick={() => router.push(`/app/documents/${id}`)}
                >
                  <FolderOpen />
                  Abrir modelo
                </Button>

                <Button
                  className="w-full justify-start  text-red-600"
                  variant="outline"
                  // onClick={() => startTransition(() => deleteDocumentModel(id))}
                  // disabled={isPending}
                >
                  {/* <Trash /> {isPending ? "Apagando..." : "Apagar modelo"} */}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
}
