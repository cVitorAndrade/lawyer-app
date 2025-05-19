import { HTMLAttributes } from "react";
import { Badge } from "../ui/badge";

interface ClientDependentCardRelationshipProps
  extends HTMLAttributes<HTMLDivElement> {
  relationship: string;
}

export default function ClientDependentCardRelationship({
  relationship,
}: ClientDependentCardRelationshipProps) {
  return (
    <Badge className="bg-indigo-600/10 h-5 dark:bg-indigo-600/20 hover:bg-indigo-600/10  text-indigo-500 shadow-none rounded-full">
      <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2" />{" "}
      {relationship}
    </Badge>
  );
}
