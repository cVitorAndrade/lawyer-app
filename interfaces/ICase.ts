type CaseType = "ADMINISTRATIVE" | "JUDICIAL";
type CasePriority = "LOW" | "MEDIUM" | "HIGH";
type CaseStatus = "IN_PROGRESS" | "FINISHED" | "CANCELED" | "PAUSED";

export interface ICreateCase {
  title: string;
  description: string;
  type: CaseType;
  priority: CasePriority;
  status: CaseStatus;
}

export interface ICase extends ICreateCase {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}
