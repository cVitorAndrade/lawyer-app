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

interface AddNewCaseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CaseCreationStep {
  title: string;
}

const caseCreationSteps: CaseCreationStep[] = [
  { title: "Case details" },
  // { title: "Client details" },
  { title: "Members" },
];

interface CaseDetails {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  type: "ADMINISTRATIVE" | "JUDICIAL";
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

  const onCreateCase = async () => {
    try {
      const createdCase = await CaseService.createCase({
        ...caseDetails,
        status: "IN_PROGRESS",
      });

      await InviteService.createInvites({
        caseId: createdCase.id,
        lawyers: selectedLawyersToCase,
      });

      toast.success(`Case was successfully created!`);
    } catch (error) {
      console.log("AddNewCase - onCreateCase: ", error);
      toast.error("Error creating case", {
        description:
          "An error occurred while trying to create the case. Please try again later.",
      });
    }
  };

  const onFinishCaseDetailsStep = (values: CaseDetails) => {
    setCaseDetails(values);
    onNextStep();
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

  return (
    <Modal.Root
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) onCloseModal();
      }}
      isOpen={isOpen}
    >
      <Modal.OpenButton>{children}</Modal.OpenButton>
      <Modal.Container className="max-w-xl w-full">
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

        <CaseDetailsForm
          onFinish={onFinishCaseDetailsStep}
          className={currentStep !== 1 ? "hidden" : ""}
        />

        <ChooseCaseLawyers
          onFinish={onFinishChooseCaseMembersStep}
          onPreviousStep={onPreviousStep}
          className={currentStep !== 2 ? "hidden" : ""}
          setSelectedLawyers={setSelectedLawyersToCase}
          selectedLawyers={selectedLawyersToCase}
        />

        {/* <Modal.Footer>
          {showBackButton && (
            <Button onClick={() => setCurrentStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {showNextButton && (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </Button>
          )}
          {showCreateCaseButton && (
            <Button onClick={() => alert("created")}>Create</Button>
          )}
        </Modal.Footer> */}
      </Modal.Container>
    </Modal.Root>
  );
}
