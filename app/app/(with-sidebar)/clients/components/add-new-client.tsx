"use client";

import { Modal } from "@/components/modal";
import { StepNavigation } from "@/components/step-navigation";
import { ReactNode, useState } from "react";
import ClientDetailsForm from "../../cases/components/client-details-form";
import { CreateClientInputType } from "@/schemas/client";
import ClientAddressForm from "../../cases/components/client-address-form";
import { CreateAddressInputType } from "@/schemas/address";
import { useServerAction } from "zsa-react";
import { createClient } from "@/actions/client/create-client";
import { createAddress } from "@/actions/address/create-address";
import { toast } from "sonner";
import { revalidate } from "@/actions/revalidate-path";
import { usePathname } from "next/navigation";

interface AddNewClientProps {
  children: ReactNode;
}
interface ClientCreationStep {
  title: string;
}

const clientCreationSteps: ClientCreationStep[] = [
  { title: "Detalhes do cliente" },
  { title: "Endereço do cliente" },
];

export default function AddNewClient({ children }: AddNewClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { execute: executeCreateClient } = useServerAction(createClient, {
    onError: ({ err }) => console.log({ err, step: "createClient" }),
  });

  const { execute: executeCreateAddress } = useServerAction(createAddress, {
    onError: ({ err }) => console.log({ err, step: "createAddress" }),
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  const onPreviousStep = () => {
    if (currentStep === 1) {
      setIsOpen(false);
      return;
    }
    setCurrentStep(currentStep - 1);
  };
  const onNextStep = () => setCurrentStep(currentStep + 1);

  const onGetIfIsHighlighted = (step: number): boolean => currentStep >= step;

  const [clientDetails, setClientDetails] = useState<CreateClientInputType>({
    birthDate: new Date(),
    email: "",
    name: "",
    telephone: "",
    cpf: "",
    gender: "FEMININO",
    motherName: "",
    maritalStatus: "",
    occupation: "",
    rg: "",
  });

  const onFinishClientDetailsStep = (values: CreateClientInputType) => {
    setClientDetails(values);
    onNextStep();
  };

  const onFinishClientAddressStep = async (values: CreateAddressInputType) => {
    try {
      const [client] = await executeCreateClient(clientDetails);
      if (!client) throw new Error("Erro ao criar o cliente");

      await executeCreateAddress({
        country: "Brasil",
        name: "casa",
        ownerId: client.id,
        ...values,
      });

      toast.success("Caso criado com sucesso!");
      await revalidate(pathname);

      setIsOpen(false);
    } catch (error) {
      console.log("AddNewClient - onFinishClientAddressStep: ", error);
    } finally {
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    setCurrentStep(1);

    setClientDetails({
      name: "",
      email: "",
      birthDate: new Date(),
      cpf: "",
      gender: "FEMININO",
      maritalStatus: "",
      motherName: "",
      occupation: "",
      rg: "",
      telephone: "",
    });
  };

  const formComponents = [
    <ClientDetailsForm
      key="client-details"
      onPreviousStep={onPreviousStep}
      onFinish={onFinishClientDetailsStep}
    />,

    <ClientAddressForm
      key="client-address"
      onPreviousStep={onPreviousStep}
      onFinish={onFinishClientAddressStep}
    />,
  ];

  return (
    <Modal.Root
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) onCloseModal();
      }}
      isOpen={isOpen}
    >
      <Modal.OpenButton>{children}</Modal.OpenButton>

      <Modal.Container className="max-w-2xl w-full overflow-auto max-h-full">
        <Modal.Header>
          <Modal.Title text="Título desse meu modal" />
          <Modal.Description text="Descrição desse meu modal" />
        </Modal.Header>

        <StepNavigation.Root>
          {clientCreationSteps.map(({ title }, index) => (
            <StepNavigation.Item key={title}>
              <StepNavigation.ItemProgressBar
                isHighlighted={onGetIfIsHighlighted(index + 1)}
              />
              <StepNavigation.ItemTitle
                text={title}
                isHighlighted={onGetIfIsHighlighted(index + 1)}
              />
            </StepNavigation.Item>
          ))}
        </StepNavigation.Root>

        {formComponents.map((component, index) => (
          <div
            className={currentStep !== index + 1 ? "hidden" : ""}
            key={index}
          >
            {component}
          </div>
        ))}
      </Modal.Container>
    </Modal.Root>
  );
}
