import type { Task } from "../types";
import { saveTasks } from "../repository";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp";
import { ErrorNotFound, ErrorValidation } from "../handlers/errorHandler";

export async function updateStatusCommand(
  taskId: unknown,
  newStatus: Task["status"] | unknown,
  tasks: Task[],
): Promise<void> {
  // Validations
  if (taskId === undefined || newStatus === undefined || taskId === null || newStatus === null) {
    throw new ErrorValidation("taskId or newStatus", "undefined/null");
  }

  const parsedTaskId = parseInt(String(taskId), 10);
  if (isNaN(parsedTaskId)) {
    throw new ErrorValidation("taskId", String(taskId));
  }

  if (newStatus !== "todo" && newStatus !== "in-progress" && newStatus !== "done") {
    throw new ErrorValidation("newStatus", String(newStatus));
  }

  const taskIndex = tasks.findIndex((t) => t.id === parsedTaskId);
  if (taskIndex === -1) {
    throw new ErrorNotFound(parsedTaskId);
  }

  const task = tasks[taskIndex];
  if (!task) {
    throw new ErrorNotFound(parsedTaskId);
  }

  tasks[taskIndex] = {
    ...task,
    status: newStatus,
    updatedAt: getCurrentTimestamp(),
  };

  await saveTasks(tasks);
}
