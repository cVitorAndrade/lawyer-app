import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import SelectExistingClient from "./select-existing-client";
import ClientDetailsForm from "./client-details-form";
import { ClientType, CreateClientInputType } from "@/schemas/client";
import { useServerAction } from "zsa-react";
import { getLawyerClients } from "@/actions/client/get-lawyer-clients";

interface ClientDecisionPanelProps {
  onFinishClientDetailsForm: (values: CreateClientInputType) => void;
  onFinishSelectExistingClientStep: () => void;
  onPreviousStep: () => void;
  setUseNewClient: React.Dispatch<React.SetStateAction<boolean>>;
  useNewClient: boolean;
  setSelectedClient: React.Dispatch<React.SetStateAction<ClientType | null>>;
  selectedClient: ClientType | null;
}

export default function ClientDecisionPanel({
  useNewClient,
  setUseNewClient,
  onFinishClientDetailsForm,
  onPreviousStep,
  onFinishSelectExistingClientStep,
  selectedClient,
  setSelectedClient,
}: ClientDecisionPanelProps) {
  const { execute: executeGetLawyerClients } =
    useServerAction(getLawyerClients);

  const [clients, setClients] = useState<ClientType[]>([]);

  const onChangeClientAddingMode = () => setUseNewClient(!useNewClient);

  const onGetLawyerClients = async () => {
    try {
      const [lawyerClients] = await executeGetLawyerClients();
      if (!lawyerClients) return;

      setClients(lawyerClients);
    } catch (error) {
      console.log("ClientDecisionPanel - onGetLawyerClients: ", error);
    }
  };

  useEffect(() => {
    onGetLawyerClients();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-full" onClick={onChangeClientAddingMode}>
        {useNewClient ? (
          <>
            <ArrowRightLeft />
            Escolher cliente existente
          </>
        ) : (
          <>
            <Plus />
            Criar novo cliente
          </>
        )}
      </Button>

      {useNewClient ? (
        <ClientDetailsForm
          onFinish={onFinishClientDetailsForm}
          onPreviousStep={onPreviousStep}
        />
      ) : (
        <SelectExistingClient
          clients={clients}
          onFinish={onFinishSelectExistingClientStep}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          onPreviousStep={onPreviousStep}
        />
      )}
    </div>
  );
}
