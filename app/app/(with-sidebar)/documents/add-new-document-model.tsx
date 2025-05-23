import { Modal } from "@/components/modal";
import { StepNavigation } from "@/components/step-navigation";
import { HTMLAttributes, ReactNode, useState } from "react";
import DocumentModelDetailsForm from "./document-model-details-form";
import UploadDocumentModelFile from "./upload-document-model-file";
import { toast } from "sonner";
import { createDocumentModel } from "@/actions/document-model/create-document-mode";
import { revalidate } from "@/actions/revalidate-path";
import { usePathname } from "next/navigation";
import { uploadDocumentModelFile } from "@/actions/document-model-file/upload-document-model-file";
import { useServerAction } from "zsa-react";

interface AddNewDocumentModelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface DocumentModelCreationStep {
  title: string;
}

interface DocumentModelDetails {
  title: string;
  description: string;
  color: string;
}

interface FileToUpload {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "success" | "error";
}

export default function AddNewDocumentModel({
  children,
}: AddNewDocumentModelProps) {
  const documentModelCreationSteps: DocumentModelCreationStep[] = [
    { title: "Dados do modelo" },
    { title: "Documentos do modelo" },
  ];

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [documentModelDetails, setDocumentModelDetails] =
    useState<DocumentModelDetails>({
      title: "",
      description: "",
      color: "#000000",
    });

  const [filesToUpload, setFilesToUpload] = useState<FileToUpload[]>([]);

  const onPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const onGetIfIsHighlighted = (step: number): boolean => {
    return currentStep >= step;
  };

  const onFinishDocumentModelDetailsStep = (values: DocumentModelDetails) => {
    setDocumentModelDetails(values);
    onNextStep();
  };

  const onFinishDocumentModelFilesStep = async () => {
    await onCreateDocumentModel();
  };

  const onCreateDocumentModel = async () => {
    try {
      const documentModel = await createDocumentModel(documentModelDetails);
      if (!documentModel) throw new Error();

      await onUploadDocumentFile(documentModel.id);
      await revalidate(pathname);

      toast.success("Modelo Criado com sucesso!");
    } catch (error) {
      console.log("AddNewDocumentModel - onCreateDocumentModel: ", error);
      toast.error("Erro ao criar modelo", {
        description:
          "Um erro ocorreu enquanto tentava criar o modelo. Por favor tente novamente mais tarde.",
      });
    } finally {
      onCloseModal();
    }
  };

  const updateFileStatus = (fileId: string, updates: Partial<FileToUpload>) => {
    setFilesToUpload((prevFiles) =>
      prevFiles.map((f) => (f.id === fileId ? { ...f, ...updates } : f))
    );
  };

  const { execute: executeUploadDocumentModelfile } = useServerAction(uploadDocumentModelFile);

  const onUploadDocumentFile = async (documentModelId: string) => {
    for (const { file, id } of filesToUpload.filter(
      ({ status }) => status !== "success"
    )) {
      updateFileStatus(id, { status: "pending", progress: 0 });

      try {
        await executeUploadDocumentModelfile({ documentModelId, file });
        updateFileStatus(id, { status: "success", progress: 100 });
        toast.success(`O arquivo ${file.name} foi enviado com sucesso!`);
      } catch {
        updateFileStatus(id, { status: "error", progress: 0 });
      }
    }
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setDocumentModelDetails({
      title: "",
      description: "",
      color: "#000000",
    });
    setFilesToUpload([]);
  };

  const formComponents = [
    <DocumentModelDetailsForm onFinish={onFinishDocumentModelDetailsStep} />,
    <UploadDocumentModelFile
      onPreviousStep={onPreviousStep}
      onFinish={onFinishDocumentModelFilesStep}
      filesToUpload={filesToUpload}
      setFilesToUpload={setFilesToUpload}
    />,
  ];

  return (
    <Modal.Root
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) onCloseModal();
      }}
      isOpen={isOpen}
      className="overflow-auto"
    >
      <Modal.OpenButton>{children}</Modal.OpenButton>
      <Modal.Container className="max-w-xl max-h-full ring-0 border-none md:max-h-[95%] overflow-auto p-4 sm:p-6">
        <Modal.Header>
          <Modal.Title text="Criar Novo Modelo" />
          <Modal.Description text="Cadastre um novo modelo com documentos para utilizá-los em seus casos. Personalize o conteúdo e facilite a padronização dos seus arquivos jurídicos" />
        </Modal.Header>

        <StepNavigation.Root>
          {documentModelCreationSteps.map(({ title }, index) => (
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
            className={currentStep !== index + 1 ? "hidden" : "flex w-full"}
            key={index}
          >
            {component}
          </div>
        ))}
      </Modal.Container>
    </Modal.Root>
  );
}
