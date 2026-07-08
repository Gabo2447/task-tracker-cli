import type { Task } from "../types";
import { saveTasks } from "../repository";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp";
import { ErrorValidation } from "../handlers/errorHandler";

export async function addCommand(tasks: Task[], description: string | undefined): Promise<void> {
  // Validations
  if (description === undefined) {
    throw new ErrorValidation("description", "undefined");
  }

  if (description.trim() === "") {
    throw new ErrorValidation("description", "empty string");
  }

  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const newTask: Task = {
    id: nextId,
    description,
    status: "todo",
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  };

  tasks.push(newTask);
  await saveTasks(tasks);
  console.log(`✅ Task added successfully: ${JSON.stringify(newTask, null, 2)}`);
}
