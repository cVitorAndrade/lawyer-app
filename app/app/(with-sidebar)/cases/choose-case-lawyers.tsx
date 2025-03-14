import LawyerMultiSelect from "@/components/fancy-multi-select";
import { Button } from "@/components/ui/button";
import { ILawyer } from "@/interfaces/ILawyer";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";

interface ChooseCaseLawyersProps extends HTMLAttributes<HTMLDivElement> {
  onFinish: (selectedLawyers: ILawyer[]) => void;
  onPreviousStep: () => void;
  selectedLawyers: ILawyer[];
  setSelectedLawyers: React.Dispatch<React.SetStateAction<ILawyer[]>>;
}

export default function ChooseCaseLawyers({
  onFinish,
  onPreviousStep,
  className,
  selectedLawyers,
  setSelectedLawyers,
}: ChooseCaseLawyersProps) {

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <LawyerMultiSelect
        selectedLawyers={selectedLawyers}
        setSelectedLawyers={setSelectedLawyers}
      />

      <div className="flex justify-end gap-2">
        <Button onClick={onPreviousStep}>Back</Button>
        <Button onClick={() => onFinish(selectedLawyers)}>Create</Button>
      </div>
    </div>
  );
}
