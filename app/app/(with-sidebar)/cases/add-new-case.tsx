import { Modal } from "@/components/modal";
import { StepNavigation } from "@/components/step-navigation";
import { HTMLAttributes, ReactNode, useState } from "react";
import CaseDetailsForm from "./case-details-form";
import ChooseCaseLawyers from "./choose-case-lawyers";
import { ILawyer } from "@/interfaces/ILawyer";
import { CaseService } from "@/service/case.service";
import { toast } from "sonner";
import { CaseLawyerService } from "@/service/case-lawyer.service";
import { LawyerService } from "@/service/lawyer.service";
import { InviteService } from "@/service/invite.service";
import ClientDetailsForm from "./client-details-form";
import ClientAddressForm from "./client-address-form";
import { ClientService } from "@/service/client.service";
import { AddressService } from "@/service/address.service";
import { CaseClientService } from "@/service/case-client.service";

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

interface CaseDetails {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  type: "ADMINISTRATIVE" | "JUDICIAL";
}

interface ClientDetails {
  name: string;
  email: string;
  telephone: string;
  birthDate: Date;
}

interface ClientAddress {
  postalCode: string;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
  number: string;
  complement: string;
}

export default function AddNewCase({ children }: AddNewCaseProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [caseDetails, setCaseDetails] = useState<CaseDetails>({
    title: "",
    description: "",
    type: "ADMINISTRATIVE",
    priority: "HIGH",
  });

  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    birthDate: new Date(),
    email: "",
    name: "",
    telephone: "",
  });

  const [clientAddress, setClientAddress] = useState<ClientAddress>({
    city: "",
    complement: "",
    neighborhood: "",
    number: "",
    postalCode: "",
    state: "",
    street: "",
  });

  const [selectedLawyersToCase, setSelectedLawyersToCase] = useState<ILawyer[]>(
    []
  );

  const onGetIfIsHighlighted = (step: number): boolean => {
    return currentStep >= step;
  };

  const onPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const onFinishCaseDetailsStep = (values: CaseDetails) => {
    setCaseDetails(values);
    onNextStep();
  };

  const onFinishClientDetailsStep = (values: ClientDetails) => {
    setClientDetails(values);
    onNextStep();
  };

  const onFinishClientAddressStep = (values: ClientAddress) => {
    setClientAddress(values);
    onNextStep();
  };

  const onCreateCase = async () => {
    try {
      const createdCase = await CaseService.createCase({
        ...caseDetails,
        status: "IN_PROGRESS",
      });

      const [_, client] = await Promise.all([
        InviteService.createInvites({
          caseId: createdCase.id,
          lawyers: selectedLawyersToCase,
        }),
        ClientService.createClient(clientDetails),
      ]);

      const [address, caseclient] = await Promise.all([
        AddressService.createAddress({
          country: "Brasil",
          name: "casa",
          ownerId: client.id,
          ...clientAddress,
        }),

        CaseClientService.createCaseClient({
          caseId: createdCase.id,
          clientId: client.id,
        }),
      ]);

      toast.success(`Case was successfully created!`);
    } catch (error) {
      console.log("AddNewCase - onCreateCase: ", error);
      toast.error("Error creating case", {
        description:
          "An error occurred while trying to create the case. Please try again later.",
      });
    } finally {
      onCloseModal();
    }
  };

  const onFinishChooseCaseMembersStep = async (lawyers: ILawyer[]) => {
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
      <Modal.Container className="max-w-2xl w-full">
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
