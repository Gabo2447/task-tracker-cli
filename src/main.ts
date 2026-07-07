import { loadTasks, saveTasks, deleteTask, updateTask } from "./repository";
import type { Task } from "./types";

// Bun.argv[0] is the path to the Bun executable, Bun.argv[1] is the path to the script being executed, and Bun.argv[2] is the first argument passed to the script.
const [, , command, arg1, arg2] = Bun.argv;

if (!command) {
  console.log("📌 Usage: task-cli <command> [arguments]");
  console.log(
    "Commands: add, update, delete, mark-in-progress, mark-don, list",
  );
  process.exit(0);
}

async function run() {
  const tasks = await loadTasks();

  if (command === null || command === undefined) return;

  switch (command.toLowerCase()) {
    case "add": {
      if (!arg1) {
        console.error("Error: Task description is required.");
        return;
      }

      addTask(arg1, tasks);
      break;
    }

    case "list": {
      listTasks(arg1 as Task["status"], tasks);
      break;
    }

    case "delete": {
      if (!arg1) {
        console.error("Error: Task ID is required.");
        return;
      }

      const taskId = parseInt(arg1, 10);

      if (isNaN(taskId)) {
        console.error("❌ Error: The provided ID must be a valid number.");
        return;
      }

      tasks.find((task) => task.id === taskId)
        ? deleteTask(taskId)
        : console.error(`❌ Error: Task with ID ${taskId} not found.`);
      break;
    }

    case "update": {
      if (!arg1 || !arg2) {
        console.error("Error: Task ID and new description are required.");
        return;
      }

      const taskId = parseInt(arg1, 10);

      if (isNaN(taskId)) {
        console.error("❌ Error: The provided ID must be a valid number.");
        return;
      }

      const taskToUpdate = tasks.find((task) => task.id === taskId);

      if (!taskToUpdate) {
        console.error(`❌ Error: Task with ID ${taskId} not found.`);
        return;
      }

      const updatedTask: Task = {
        ...taskToUpdate,
        description: arg2,
        updatedAt: new Date().toISOString(),
      };

      updateTask(updatedTask);
      break;
    }

    case "mark-in-progress": {
      if (!arg1) {
        console.error("Error: Task ID is required.");
        return;
      }

      const taskId = parseInt(arg1, 10);

      if (isNaN(taskId)) {
        console.error("❌ Error: The provided ID must be a valid number.");
        return;
      }

      await updateTaskStatus(taskId, "in-progress", tasks);
      break;
    }

    case "mark-done": {
      if (!arg1) {
        console.error("Error: Task ID is required.");
        return;
      }

      const taskId = parseInt(arg1, 10);

      if (isNaN(taskId)) {
        console.error("❌ Error: The provided ID must be a valid number.");
        return;
      }

      await updateTaskStatus(taskId, "done", tasks);
    }
  }
}

/**
 * Update the status of a task
 * @param taskId
 * @param newStatus
 * @param tasks
 * @returns
 */
async function updateTaskStatus(
  taskId: number,
  newStatus: Task["status"],
  tasks: Task[],
) {
  const taskToUpdate = tasks.find((task) => task.id === taskId);

  if (!taskToUpdate) {
    console.error(`❌ Error: Task with ID ${taskId} not found.`);
    return;
  }

  const updatedTask: Task = {
    ...taskToUpdate,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  updateTask(updatedTask);
}

/**
 * List tasks based on a status filter
 * @param filter
 * @param tasks
 * @returns
 */
async function listTasks(filter?: Task["status"], tasks?: Task[]) {
  if (!tasks || tasks.length === 0) {
    return;
  }

  const newFilter = filter ? filter.toLowerCase() : undefined;
  let filtered = tasks;

  if (newFilter) {
    filtered = tasks.filter((task) => task.status === newFilter);
  }

  if (filtered.length === 0) {
    console.log("No tasks found.");
    return;
  }

  filtered.forEach((t) => {
    console.log(
      `ID: ${t.id}, Description: ${t.description}, Status: ${t.status}, Created At: ${t.createdAt}, Updated At: ${t.updatedAt}`,
    );
  });
}

/**
 * Agregar una nueva tarea
 * @param description
 * @param tasks
 */
async function addTask(description: string, tasks: Task[]) {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const newTask: Task = {
    id: nextId,
    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await saveTasks(tasks);
  console.log(
    `✅ Task added. ID: ${newTask.id}, Description: ${newTask.description}`,
  );
}

run();
