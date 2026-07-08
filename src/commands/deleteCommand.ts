import type { Task } from "../types";
import { saveTasks } from "../repository";
import { ErrorNotFound, ErrorValidation } from "../handlers/errorHandler";

export async function deleteCommand(tasks: Task[], taskId: unknown): Promise<void> {
  // Validations
  if (taskId === "all") {
    await saveTasks([]);
    console.log("✅ All tasks have been deleted successfully.");
    return;
  }

  if (taskId === undefined || taskId === null || String(taskId).trim() === "") {
    throw new ErrorValidation("taskId", "undefined/null/empty");
  }

  const parsedTaskId = parseInt(String(taskId), 10);
  if (isNaN(parsedTaskId)) {
    throw new ErrorValidation("taskId", String(taskId));
  }

  const taskIndex = tasks.findIndex((t) => t.id === parsedTaskId);

  if (taskIndex === -1) {
    throw new ErrorNotFound(parsedTaskId);
  }

  tasks.splice(taskIndex, 1);

  await saveTasks(tasks);
  console.log(`✅ Task with ID ${parsedTaskId} has been deleted successfully.`);
}
