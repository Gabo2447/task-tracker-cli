import type { Task } from "./types";

const FILE_PATH = "./tasks.json";

export async function loadTasks(): Promise<Task[]> {
  const file = Bun.file(FILE_PATH);

  if (!(await file.exists())) {
    return [];
  }

  try {
    return (await file.json()) as Task[];
  } catch (err) {
    console.error("Error loading tasks:", err);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await Bun.write(FILE_PATH, JSON.stringify(tasks, null, 2));
}

export async function deleteTask(taskId: number): Promise<void> {
  try {
    const tasks = await loadTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    await saveTasks(updatedTasks);
    console.log(`Task with ID ${taskId} has been deleted.`);
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}

export async function updateTask(updatedTask: Task): Promise<void> {
  try {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);

    if (index !== -1) {
      tasks[index] = updatedTask;
      await saveTasks(tasks);
      console.log(`Updated Task: ${JSON.stringify(updatedTask, null, 2)}`);
    } else {
      console.error(`Task with ID ${updatedTask.id} not found.`);
    }
  } catch (err) {
    console.error("Error updating task:", err);
  }
}
