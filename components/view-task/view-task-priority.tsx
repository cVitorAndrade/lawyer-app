type PriorityType = "high" | "medium" | "low";

interface ViewTaskPriorityProps {
  priority: PriorityType;
}

export default function ViewTaskPriority({ priority }: ViewTaskPriorityProps) {
  const priorityStyle = {
    high: {
      color: "#f21245",
      bg: "rgba(242, 18, 69, .2)",
    },
    medium: {
      color: "#d8bb47",
      bg: "rgba(255, 222, 89, .3)",
    },
    low: {
      color: "#00E676",
      bg: "rgba(0, 230, 118, .2)",
    },
  };

  return (
    <div
      className="capitalize text-sm py-0.5 px-1 rounded-lg font-medium"
      style={{
        background: priorityStyle[priority].bg,
      }}
    >
      {priority} priority
    </div>
  );
}
