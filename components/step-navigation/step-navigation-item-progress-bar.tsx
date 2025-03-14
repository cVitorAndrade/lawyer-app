import { Progress } from "../ui/progress";

interface StepNavigationItemProgressBarProps {
  isHighlighted?: boolean;
}

export default function StepNavigationItemProgressBar({
  isHighlighted = false,
}: StepNavigationItemProgressBarProps) {
  return (
    <Progress
      value={isHighlighted ? 100 : 0}
      className="h-1"
    />
  );
}
