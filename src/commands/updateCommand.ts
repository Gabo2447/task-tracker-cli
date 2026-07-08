import type { Task } from "../types";
import { saveTasks } from "../repository";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp";
import { ErrorNotFound, ErrorValidation } from "../handlers/errorHandler";

export async function updateCommand(taskId: unknown, newDescription: unknown, tasks: Task[]): Promise<void> {
  // Validations
  if (taskId === undefined || newDescription === undefined || taskId === null || newDescription === null) {
    throw new ErrorValidation("taskId or newDescription", "undefined/null");
  }

  const parsedTaskId = parseInt(String(taskId), 10);
  if (isNaN(parsedTaskId)) {
    throw new ErrorValidation("taskId", String(taskId));
  }

  if (typeof newDescription !== "string" || newDescription.trim() === "") {
    throw new ErrorValidation("newDescription", String(newDescription));
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
    description: newDescription,
    updatedAt: getCurrentTimestamp(),
  };

  await saveTasks(tasks);
  console.log(`✅ Task with ID ${parsedTaskId} has been updated successfully.`);
}
