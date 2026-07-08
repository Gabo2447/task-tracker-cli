import type { Task } from "./types";
const FILE_PATH = "./tasks.json";

export async function loadTasks(): Promise<Task[]> {
  const file = Bun.file(FILE_PATH);

  if (!(await file.exists())) {
    return [];
  }

  try {
    const data = await file.json();

    if (!Array.isArray(data)) {
      console.warn("⚠️ tasks.json is not a valid array. Resetting.");
      return [];
    }

    return data as Task[];
  } catch (err) {
    console.error("Error loading tasks:", err);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await Bun.write(FILE_PATH, JSON.stringify(tasks, null, 2));
}
