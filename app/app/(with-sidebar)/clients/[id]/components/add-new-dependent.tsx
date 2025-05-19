import { Modal } from "@/components/modal";
import { StepNavigation } from "@/components/step-navigation";
import { HTMLAttributes, ReactNode, useState } from "react";
import DependentDetailsForm from "./dependent-details-form";
import { CreateDependentInputType } from "@/schemas/dependents";
import DependentAddressForm from "./dependent-address-form";
import { AddressType, CreateAddressInputType } from "@/schemas/address";
import { useServerAction } from "zsa-react";
import { createAddress } from "@/actions/address/create-address";
import { createDependent } from "@/actions/dependent/create-dependent";
import { toast } from "sonner";
import { revalidate } from "@/actions/revalidate-path";
import { usePathname } from "next/navigation";

interface AddNewDependentProps extends HTMLAttributes<HTMLDivElement> {
  clientAddress: AddressType;
  clientId: string;
  children: ReactNode;
}

interface DependentCreationStep {
  title: string;
}

const dependentCreationSteps: DependentCreationStep[] = [
  { title: "Detalhes do dependente" },
  { title: "Endereço do dependente" },
];

export default function AddNewDependent({
  clientAddress,
  clientId,
  children,
}: AddNewDependentProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { execute: executeCreateDependent } = useServerAction(createDependent, {
    onError: ({ err }) => {
      console.log({ err, step: "createDependent" });
    },
  });

  const { execute: executeCreateAddress } = useServerAction(createAddress, {
    onError: ({ err }) => {
      console.log({ err, step: "createAddress" });
    },
  });

  const [dependentDetails, setDependentDetails] =
    useState<CreateDependentInputType>();

  const onGetIfIsHighlighted = (step: number): boolean => currentStep >= step;

  const onPreviousStep = () => {
    if (currentStep === 1) {
      setIsOpen(false);
      return;
    }

    setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => setCurrentStep(currentStep + 1);

  const onFinishDepentDetailsStep = (values: CreateDependentInputType) => {
    setDependentDetails(values);
    onNextStep();
  };

  const onFinishDependentAddressStep = async (
    values: CreateAddressInputType
  ) => {
    try {
      if (!dependentDetails) return;

      const [dependent] = await executeCreateDependent({
        clientId,
        ...dependentDetails,
      });
      if (!dependent) throw new Error("Ocorreu um erro ao criar o dependente");

      await executeCreateAddress({
        ownerId: dependent.id,
        country: "Brasil",
        name: "casa",
        ...values,
      });

      toast.success("Dependente criado com sucesso");
      await revalidate(pathname);
    } catch (error) {
      console.log("AddNewDependent - onFinishDependentAddressStep: ", error);
      toast.error("Erro ao criar Dependent", {
        description:
          "Ocorreu um erro ao tentar criar o dependente. Por favor tente novamente.",
      });
    } finally {
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    setCurrentStep(1);
    setIsOpen(false);
  };

  const formComponents = [
    <DependentDetailsForm
      key="dependent-details"
      onFinish={onFinishDepentDetailsStep}
      onPreviousStep={onPreviousStep}
    />,
    <DependentAddressForm
      key="dependent-address"
      onPreviousStep={onPreviousStep}
      onFinish={onFinishDependentAddressStep}
      clientAddress={clientAddress}
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
          {dependentCreationSteps.map(({ title }, index) => (
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
