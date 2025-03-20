import LawyerMultiSelect from "@/components/fancy-multi-select";
import { Button } from "@/components/ui/button";
import { ILawyer } from "@/interfaces/ILawyer";

interface ChooseCaseLawyersProps {
  onFinish: (selectedLawyers: ILawyer[]) => void;
  onPreviousStep: () => void;
  selectedLawyers: ILawyer[];
  setSelectedLawyers: React.Dispatch<React.SetStateAction<ILawyer[]>>;
}

export default function ChooseCaseLawyers({
  onFinish,
  onPreviousStep,
  selectedLawyers,
  setSelectedLawyers,
}: ChooseCaseLawyersProps) {
  return (
    <div className="flex flex-col gap-4">
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
