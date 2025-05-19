"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DependentType } from "@/schemas/dependents";
import { ClientDependentCard } from "@/components/client-dependent-card";
import {
  AtSign,
  Bookmark,
  Building,
  Calendar,
  CirclePlus,
  Dot,
  Files,
  Flag,
  Globe,
  Handshake,
  Hash,
  IdCard,
  Mail,
  Map,
  MapPin,
  Phone,
  SignpostBig,
  User,
  VenusAndMars,
} from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAvatarFallback } from "@/hooks/use-avatar-url";

interface ClientDependentsSectionProps {
  dependents: DependentType[];
}

export default function ClientDependentsSection({
  dependents,
}: ClientDependentsSectionProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  console.log("current :", current);

  const MIN_CARDS = 10;

  const getExtendedDependents = (dependents: DependentType[]) => {
    const count = dependents.length;

    if (count >= MIN_CARDS) return dependents;

    const multiplier = Math.ceil(MIN_CARDS / count);
    return Array.from(
      { length: count * multiplier },
      (_, i) => dependents[i % count]
    );
  };

  const extendedDependents = getExtendedDependents(dependents);
  const selectedDependent = extendedDependents[current - 1];

  const onDependentCardClick = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {dependents.map(
          ({ id, name, occupation, relationship, birthDate }, index) => (
            <ClientDependentCard.Root
              key={id}
              onClick={() => onDependentCardClick(index)}
              isHighlighted={selectedDependent && selectedDependent.id === id}
            >
              <ClientDependentCard.Avatar name={name} />

              <ClientDependentCard.Details>
                <ClientDependentCard.Header>
                  <ClientDependentCard.Name name={name} />
                  <ClientDependentCard.Relationship
                    relationship={relationship}
                  />
                </ClientDependentCard.Header>

                <ClientDependentCard.Footer>
                  <ClientDependentCard.AdditionalInfo
                    icon={IdCard}
                    value={occupation}
                  />
                  <ClientDependentCard.AdditionalInfo
                    icon={Calendar}
                    value={formatDate(birthDate)}
                  />
                </ClientDependentCard.Footer>
              </ClientDependentCard.Details>
            </ClientDependentCard.Root>
          )
        )}
      </div>

      {dependents.length >= 1 && (
        <div className="mx-auto w-4/5">
          <Carousel
            setApi={setApi}
            className="w-4/5 mx-auto"
            opts={{ loop: true, align: "center" }}
          >
            <CarouselContent className="py-3">
              {extendedDependents.map(({ name }, index) => (
                <CarouselItem
                  key={index}
                  className={cn("basis-[20%] mx-auto", {})}
                >
                  <Avatar
                    className={cn(
                      "transition-transform duration-500 size-36 border",
                      {
                        "scale-[0.6]": index !== current - 1,
                      }
                    )}
                  >
                    <AvatarImage src="" />
                    <AvatarFallback className="text-4xl">
                      {getAvatarFallback(name)}
                    </AvatarFallback>
                  </Avatar>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {selectedDependent && (
        <div className="flex flex-col gap-4">
          <div className="bg-neutral-100/80 p-3 rounded-lg border shadow-md">
            <div>
              <h2 className="text-center font-semibold text-xl">
                {selectedDependent.name}
              </h2>
            </div>
            <div className="text-neutral-500 flex justify-center text-xs gap-2 items-center">
              <div className="flex gap-2 items-center">
                <IdCard size={14} /> <span>{selectedDependent.occupation}</span>
              </div>
              <Dot />
              <div className="flex gap-2 items-center">
                <Calendar size={14} />{" "}
                <span>{formatDate(selectedDependent.birthDate)}</span>
              </div>
              <Dot />
              <Badge className="bg-indigo-600/10 h-5 dark:bg-indigo-600/20 hover:bg-indigo-600/10  text-indigo-500 shadow-none rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2" />{" "}
                {selectedDependent.relationship}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 bg-neutral-100/80 border shadow-md p-3 rounded-lg">
              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <User size={18} />
                  <span className="font-medium">Nome:</span>
                </div>

                <div>
                  <span className="font-medium">{selectedDependent.name}</span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <IdCard size={18} />
                  <span className="font-medium">RG:</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-medium">{selectedDependent.rg}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="h-fit p-1.5"
                      onClick={() =>
                        navigator.clipboard.writeText(selectedDependent.rg)
                      }
                    >
                      <Files />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <IdCard size={18} />
                  <span className="font-medium">CPF:</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-medium">{selectedDependent.cpf}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="h-fit p-1.5"
                      onClick={() =>
                        navigator.clipboard.writeText(selectedDependent.cpf)
                      }
                    >
                      <Files />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Mail size={18} />
                  <span className="font-medium">Email:</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-medium">{selectedDependent.email}</span>
                  <div className="flex items-center gap-2">
                    <Link href={`mailto:email@email.com`}>
                      <Button variant="outline" className="h-fit p-1.5">
                        <AtSign />
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      className="h-fit p-1.5"
                      onClick={() =>
                        navigator.clipboard.writeText(selectedDependent.email)
                      }
                    >
                      <Files />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Phone size={18} />
                  <span className="font-medium">Tel:</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    {selectedDependent.telephone}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link href={`tel:+5588981349193`}>
                      <Button variant="outline" className="h-fit p-1.5">
                        <Phone />
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      className="h-fit p-1.5"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          selectedDependent.telephone
                        )
                      }
                    >
                      <Files />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <User size={18} />
                  <span className="font-medium">Nome da mãe:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.motherName}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Handshake size={18} />
                  <span className="font-medium">Estado civil:</span>
                </div>

                <div>
                  <span className="font-medium capitalize">
                    {selectedDependent.maritalStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <VenusAndMars size={18} />
                  <span className="font-medium">Gênero:</span>
                </div>

                <div>
                  <span className="font-medium capitalize">
                    {selectedDependent.gender.toLocaleLowerCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Calendar size={18} />
                  <span className="font-medium">Data de nascimento:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {formatDate(selectedDependent.birthDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 border shadow-md bg-neutral-100/80 p-3 rounded-lg">
              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Bookmark size={18} />
                  <span className="font-medium">Nome:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Globe size={18} />
                  <span className="font-medium">País:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.country}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <MapPin size={18} />
                  <span className="font-medium">CEP:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.postalCode}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Flag size={18} />
                  <span className="font-medium">Estado:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.state}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Building size={18} />
                  <span className="font-medium">Cidade:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.city}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Map size={18} />
                  <span className="font-medium">Bairro:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.neighborhood}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <SignpostBig size={18} />
                  <span className="font-medium">Rua:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.street}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Hash size={18} />
                  <span className="font-medium">Número:</span>
                </div>

                <div>
                  <span className="font-medium">
                    {selectedDependent.address.number}
                  </span>
                </div>
              </div>

              {selectedDependent.address.complement && (
                <div className="flex items-center sm:gap-4 flex-wrap gap-1">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <CirclePlus size={18} />
                    <span className="font-medium">Complemento:</span>
                  </div>

                  <div>
                    <span className="font-medium">
                      {selectedDependent.address.complement}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-neutral-100/80 border shadow-md p-3 rounded-lg flex flex-col gap-2">
              <h3 className="font-medium text-stone-700">Observação:</h3>

              <p className="font-medium text-sm">
                {selectedDependent.observation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
