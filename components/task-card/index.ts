import TaskCardAddSubtask from "./task-card-add-subtask";
import TaskCardAssignedToItem from "./task-card-assigned-to-item";
import TaskCardAssignedToSection from "./task-card-assigned-to-section";
import TaskCardBody from "./task-card-body";
import TaskCardDetails from "./task-card-details";
import TaskCardFooter from "./task-card-footer";
import TaskCardHeader from "./task-card-header";
import TaskCardRoot from "./task-card-root";
import TaskCardStatsItem from "./task-card-stats-item";
import TaskCardStatsSection from "./task-card-stats-section";
import TaskCardSubtaskProgress from "./task-card-subtask-progress";
import TaskCardSubtaskSection from "./task-card-subtask-section";
import TaskCardTitle from "./task-card-title";

export const TaskCard = {
  Root: TaskCardRoot,
  Header: TaskCardHeader,
  Title: TaskCardTitle,
  Body: TaskCardBody,
  Details: TaskCardDetails,
  StatsSection: TaskCardStatsSection,
  StatsItem: TaskCardStatsItem,
  AssignedToItem: TaskCardAssignedToItem,
  AssignedToSection: TaskCardAssignedToSection,
  SubtaskProgress: TaskCardSubtaskProgress,
  SubtaskSection: TaskCardSubtaskSection,
  Footer: TaskCardFooter,
  AddSubtask: TaskCardAddSubtask,
};
