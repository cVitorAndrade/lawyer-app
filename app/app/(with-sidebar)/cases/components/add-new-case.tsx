"use client";

import { HTMLAttributes, ReactNode, useState } from "react";
import { Modal } from "@/components/modal";
import { StepNavigation } from "@/components/step-navigation";

import { toast } from "sonner";

import CaseDetailsForm from "./case-details-form";
import ClientDetailsForm from "./client-details-form";
import ClientAddressForm from "./client-address-form";
import ChooseCaseLawyers from "./choose-case-lawyers";

import { usePathname } from "next/navigation";
import { useServerAction } from "zsa-react";

import { revalidate } from "@/actions/revalidate-path";

import { createCase } from "@/actions/case/create-case";
import { createClient } from "@/actions/client/create-client";
import { createAddress } from "@/actions/address/create-address";
import { createCaseClient } from "@/actions/case-client/create-case-client";
import { createInvite } from "@/actions/invite/create-invite";

import { CreateAddressInputType } from "@/schemas/address";
import { CreateCaseInputType } from "@/schemas/case";
import { CreateClientInputType } from "@/schemas/client";
import { LawyerType } from "@/schemas/lawyer";

interface AddNewCaseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CaseCreationStep {
  title: string;
}

const caseCreationSteps: CaseCreationStep[] = [
  { title: "Detalhes do caso" },
  { title: "Dados do cliente" },
  { title: "Endereço do cliente" },
  { title: "Membros" },
];

export default function AddNewCase({ children }: AddNewCaseProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { execute: executeCreateInvite } = useServerAction(createInvite, {
    onError: ({ err }) => {
      toast.error("Ocorreu um erro enquanto criava o convite para o caso");
      console.log({ err });
    },
  });

  const { execute: executeCreateCase } = useServerAction(createCase, {
    onError: ({ err }) => console.log({ err, step: "createCase" }),
  });

  const { execute: executeCreateClient } = useServerAction(createClient, {
    onError: ({ err }) => console.log({ err, step: "createClient" }),
  });

  const { execute: executeCreateAddress } = useServerAction(createAddress, {
    onError: ({ err }) => console.log({ err, step: "createAddress" }),
  });

  const { execute: executeCreateCaseClient } = useServerAction(
    createCaseClient,
    {
      onError: ({ err }) => console.log({ err, step: "createCaseClient" }),
    }
  );

  const [caseDetails, setCaseDetails] = useState<CreateCaseInputType>({
    title: "",
    description: "",
    type: "ADMINISTRATIVE",
    priority: "HIGH",
  });

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

  const [clientAddress, setClientAddress] = useState<CreateAddressInputType>({
    city: "",
    complement: "",
    neighborhood: "",
    number: "",
    postalCode: "",
    state: "",
    street: "",
  });

  const [selectedLawyersToCase, setSelectedLawyersToCase] = useState<
    LawyerType[]
  >([]);

  const onGetIfIsHighlighted = (step: number): boolean => currentStep >= step;

  const onPreviousStep = () => setCurrentStep(currentStep - 1);

  const onNextStep = () => setCurrentStep(currentStep + 1);

  const onFinishCaseDetailsStep = (values: CreateCaseInputType) => {
    setCaseDetails(values);
    onNextStep();
  };

  const onFinishClientDetailsStep = (values: CreateClientInputType) => {
    setClientDetails(values);
    onNextStep();
  };

  const onFinishClientAddressStep = (values: CreateAddressInputType) => {
    setClientAddress(values);
    onNextStep();
  };

  const onCreateCase = async () => {
    try {
      const [createdCase] = await executeCreateCase({
        ...caseDetails,
        status: "IN_PROGRESS",
      });

      if (!createdCase) throw new Error("Erro ao criar caso");

      const [client] = await executeCreateClient(clientDetails);
      if (!client) throw new Error("Erro ao criar o cliente");

      await Promise.all([
        executeCreateInvite({
          caseId: createdCase.id,
          lawyers: selectedLawyersToCase,
        }),
        executeCreateAddress({
          country: "Brasil",
          name: "casa",
          ownerId: client.id,
          ...clientAddress,
        }),
        executeCreateCaseClient({
          caseId: createdCase.id,
          clientId: client.id,
        }),
      ]);

      toast.success("Caso criado com sucesso!");
      await revalidate(pathname);
    } catch (error) {
      console.log("AddNewCase - onCreateCase: ", error);
      toast.error("Erro ao criar caso", {
        description:
          "Ocorreu um erro ao tentar criar o caso. Por favor tente novamente.",
      });
    } finally {
      onCloseModal();
    }
  };

  const onFinishChooseCaseMembersStep = async (lawyers: LawyerType[]) => {
    try {
      setSelectedLawyersToCase(lawyers);
      await onCreateCase();
      setIsOpen(false);
    } catch (error) {
      console.log("AddNewCase - onFinishChooseCaseMembersStep:", error);
    }
  };

  const onCloseModal = () => {
    setCurrentStep(1);
    setCaseDetails({
      title: "",
      description: "",
      type: "ADMINISTRATIVE",
      priority: "HIGH",
    });
    setSelectedLawyersToCase([]);
  };

  const formComponents = [
    <CaseDetailsForm key="case-details" onFinish={onFinishCaseDetailsStep} />,
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
    <ChooseCaseLawyers
      key="choose-lawyers"
      onFinish={onFinishChooseCaseMembersStep}
      onPreviousStep={onPreviousStep}
      setSelectedLawyers={setSelectedLawyersToCase}
      selectedLawyers={selectedLawyersToCase}
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
          {caseCreationSteps.map(({ title }, index) => (
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
