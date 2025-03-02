import { Progress } from "../ui/progress";

interface TaskCardSubtaskProgressProps {
  percentage: number;
  indicatorColor: string;
}

export default function TaskCardSubtaskProgress({
  percentage,
  indicatorColor,
}: TaskCardSubtaskProgressProps) {
  return (
    <div className="px-4 pb-2">
      <Progress value={percentage} indicatorColor={indicatorColor} />
    </div>
  );
}
