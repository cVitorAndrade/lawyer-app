import { CasePriority, CaseStatus, CaseType } from "@/interfaces/ICase";

export const formatType = (type: CaseType) => {
  const label = {
    ADMINISTRATIVE: "Administrativo",
    JUDICIAL: "Judicial",
  };

  return label[type];
};

export const formatStatus = (status: CaseStatus) => {
  const label = {
    IN_PROGRESS: "Em progresso",
    FINISHED: "Finalizado",
    CANCELED: "Cancelado",
    PAUSED: "Pausado",
  };

  return label[status];
};

export const formatePriority = (priority: CasePriority): string => {
  const label = {
    LOW: "Baixa",
    MEDIUM: "Média",
    HIGH: "Alta",
  };

  return label[priority];
};
