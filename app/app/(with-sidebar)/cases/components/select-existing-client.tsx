import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAvatarFallback } from "@/hooks/use-avatar-url";
import { formatDate } from "@/lib/date-utils";
import { ClientType } from "@/schemas/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, IdCard } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SelectExistingClientProps {
  selectedClient: ClientType | null;
  setSelectedClient: React.Dispatch<React.SetStateAction<ClientType | null>>;
  onFinish: () => void;
  clients: ClientType[];
  onPreviousStep: () => void
}

export default function SelectExistingClient({
  onPreviousStep,
  onFinish,
  clients,
  selectedClient,
  setSelectedClient,
}: SelectExistingClientProps) {
  const onClientSelect = (client: ClientType) => {
    if (!selectedClient) {
      setSelectedClient(client);
      return;
    }

    if (selectedClient.id === client.id) {
      setSelectedClient(null);
      return;
    }

    setSelectedClient(client);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input />

      <ScrollArea className="h-72 py-4 border rounded-lg px-2 shadow-md">
        <div className="h-full space-y-4">
          {clients.length >= 1 ? (
            clients.map((client) => (
              <div
                key={client.id}
                className={twMerge(
                  "flex justify-between items-center gap-4 border-2 cursor-pointer rounded-lg p-2 shadow-md w-full transition-all duration-500",
                  client.id === selectedClient?.id && "border-black"
                )}
                onClick={() => onClientSelect(client)}
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    {/* <AvatarImage src="https://github.com/maykbrito.png" /> */}
                    <AvatarFallback>
                      {getAvatarFallback(client.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="text-lg font-medium">{client.name}</h2>
                    <div className="text-neutral-500 text-xs flex gap-2">
                      <div>
                        <div className="flex gap-2 items-center">
                          <IdCard size={14} /> <span>{client.occupation}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex gap-2 items-center">
                          <Calendar size={14} />{" "}
                          <span>{formatDate(client.birthDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Checkbox checked={client.id === selectedClient?.id} />
              </div>
            ))
          ) : (
            <p className="text-sm text-center font-semibold text-neutral-600">
              Você não possui clientes cadastrados
            </p>
          )}
        </div>
      </ScrollArea>

      {selectedClient && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium">Cliente selecionado: </h2>
          <div
            className="flex justify-between items-center gap-4 border-2 cursor-pointer rounded-lg p-2 shadow-md w-full border-black"
            onClick={() => setSelectedClient(null)}
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/maykbrito.png" />
                <AvatarFallback>
                  {getAvatarFallback(selectedClient.name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-lg font-medium">{selectedClient.name}</h2>
                <div className="text-neutral-500 text-xs flex gap-2">
                  <div>
                    <div className="flex gap-2 items-center">
                      <IdCard size={14} />{" "}
                      <span>{selectedClient.occupation}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex gap-2 items-center">
                      <Calendar size={14} />{" "}
                      <span>{formatDate(selectedClient.birthDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Checkbox checked />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onPreviousStep}>
          Voltar
        </Button>
        <Button onClick={onFinish}>Avançar</Button>
      </div>
    </div>
  );
}
