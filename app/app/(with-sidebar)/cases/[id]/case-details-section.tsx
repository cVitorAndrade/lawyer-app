"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAvatarFallback, getAvatarUrl } from "@/hooks/use-avatar-url";
import { ICase } from "@/interfaces/ICase";
import { formatDate } from "@/lib/date-utils";
import {
  AtSign,
  Bookmark,
  BriefcaseBusiness,
  Building,
  Calendar,
  CirclePlus,
  Files,
  Flag,
  Globe,
  Hash,
  ListTodo,
  Mail,
  Map,
  MapPin,
  Phone,
  SignpostBig,
  Tags,
  Timer,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

interface CaseDetailsSectionProps {
  caseDetails: ICase;
}

export default function CaseDetailsSection({
  caseDetails,
}: CaseDetailsSectionProps) {
  const { createdBy, lawyers, clients } = caseDetails;

  return (
    <div>
      <div className="py-4 border-y text-sm flex flex-col gap-4">
        {clients.map(({ id, name, email, telephone, birthDate, address }) => (
          <div key={id} className="flex flex-col gap-4">
            <h3 className="font-medium text-base">Dados do cliente</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <User size={18} />
                    <span className="font-medium">Name:</span>
                  </div>

                  <div>
                    <span className="font-medium">{name}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Mail size={18} />
                    <span className="font-medium">Email:</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-medium">{email}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`mailto:${email}`}>
                        <Button variant="outline" className="h-fit p-1.5">
                          <AtSign />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        className="h-fit p-1.5"
                        onClick={() => navigator.clipboard.writeText(email)}
                      >
                        <Files />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Phone size={18} />
                    <span className="font-medium">Tel:</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-medium">{telephone}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`tel:${telephone}`}>
                        <Button variant="outline" className="h-fit p-1.5">
                          <Phone />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        className="h-fit p-1.5"
                        onClick={() => navigator.clipboard.writeText(telephone)}
                      >
                        <Files />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Calendar size={18} />
                    <span className="font-medium">Data de nascimento:</span>
                  </div>

                  <div>
                    <span className="font-medium">{formatDate(birthDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Bookmark size={18} />
                    <span className="font-medium">Nome:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.name}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Globe size={18} />
                    <span className="font-medium">País:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.country}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <MapPin size={18} />
                    <span className="font-medium">CEP:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.postalCode}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Flag size={18} />
                    <span className="font-medium">Estado:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.state}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Building size={18} />
                    <span className="font-medium">Cidade:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.city}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Map size={18} />
                    <span className="font-medium">Bairro:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.neighborhood}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <SignpostBig size={18} />
                    <span className="font-medium">Rua:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.street}</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Hash size={18} />
                    <span className="font-medium">Número:</span>
                  </div>

                  <div>
                    <span className="font-medium">{address.number}</span>
                  </div>
                </div>

                {address.complement && (
                  <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                    <div className="flex items-center gap-2 text-neutral-500">
                      <CirclePlus size={18} />
                      <span className="font-medium">Complemento:</span>
                    </div>

                    <div>
                      <span className="font-medium">{address.complement}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <Separator />

        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-base">Dados do caso</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <BriefcaseBusiness size={18} />
                <span className="font-medium">Case name:</span>
              </div>

              <div>
                <span className="font-medium">{caseDetails.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <Tags size={18} />
                <span className="font-medium">Type:</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg text-blue-800 bg-blue-100/50">
                  <span className="capitalize">{caseDetails.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <ListTodo size={18} />
                <span className="font-medium">Status:</span>
              </div>

              <div>
                <div className="flex gap-2 items-center text-xs w-fit p-1 font-semibold rounded-lg bg-blue-200/50 text-blue-700">
                  <Timer size={16} />
                  <span className="capitalize">{caseDetails.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <User size={18} />
                <span className="font-medium">Created by:</span>
              </div>

              <div className="flex relative -space-x-2 group">
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={getAvatarUrl(createdBy.avatar)}
                          alt={`imagem do ${createdBy.name}`}
                        />
                        <AvatarFallback>
                          {getAvatarFallback(createdBy.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{createdBy.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <Users size={18} />
                <span className="font-medium">Assigned to:</span>
              </div>

              <div className="flex relative -space-x-2 group">
                {lawyers.map(({ id, avatar, name }) => (
                  <TooltipProvider key={id}>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger>
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={getAvatarUrl(avatar)}
                            alt={`Imagem do ${name}`}
                          />
                          <AvatarFallback>
                            {getAvatarFallback(name)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>{name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <Calendar size={18} />
                <span className="font-medium">Date created:</span>
              </div>

              <div>
                <span className="font-medium">
                  {formatDate(caseDetails.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
