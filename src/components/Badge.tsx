import React from "react";
import { todoStatus } from "../types/todo";
import { cva, type VariantProps } from "class-variance-authority";
import { capitalize, cn } from "../lib/utils";

type TodoStatusType = (typeof todoStatus.enum)[keyof typeof todoStatus.enum];

const badgeVariants = cva(
  "block w-full py-3 px-4 pe-9 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      status: {
        NAO_INICIADO:
          "bg-blue-100 text-blue-800 border-gray-200 dark:bg-blue-800/30 dark:text-blue-500 dark:border-neutral-700",
        EM_ANDAMENTO:
          "bg-yellow-100 text-yellow-800 border-gray-200 dark:bg-yellow-800/30 dark:text-yellow-500 dark:border-neutral-700",
        CONCLUIDO:
          "bg-teal-100 text-teal-800 border-gray-200 dark:bg-teal-800/30 dark:text-teal-500 dark:border-neutral-700",
      } as Record<TodoStatusType, string>,
    },
    defaultVariants: {
      status: "NAO_INICIADO",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  status: TodoStatusType;
  onStatusChange: (newStatus: TodoStatusType) => Promise<void>;
}

export const Badge: React.FC<BadgeProps & { className?: string }> = ({
  status,
  onStatusChange,
  className,
}) => {
  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value as TodoStatusType;
    try {
      await onStatusChange(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="relative inline-block">
      <select
        className={cn(
          badgeVariants({ status }),
          className
        )}
        value={status}
        onChange={handleStatusChange}
      >
        {Object.values(todoStatus.enum).map((statusOption) => (
          <option
            key={statusOption}
            value={statusOption}
          >
            {capitalize(statusOption)}
          </option>
        ))}
      </select>
    </div>
  );
};
