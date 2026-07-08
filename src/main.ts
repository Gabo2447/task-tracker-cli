import { loadTasks } from "./repository";

import { updateCommand } from "./commands/updateCommand";
import { addCommand } from "./commands/addCommand";
import { deleteCommand } from "./commands/deleteCommand";
import { updateStatusCommand } from "./commands/updateStatusCommand";
import { listCommand } from "./commands/listCommand";

import type { Task } from "./types";

// Bun.argv[0] is the path to the Bun executable, Bun.argv[1] is the path to the script being executed, and Bun.argv[2] is the first argument passed to the script.
const [, , command, arg1, arg2] = Bun.argv;

if (!command) {
  console.log("📌 Usage: task-cli <command> [arguments]");
  console.log("Commands: add, update, delete, mark-in-progress, mark-don, list");
  process.exit(0);
}

async function run() {
  const tasks = await loadTasks();

  if (command === null || command === undefined) return;

  switch (command.toLowerCase()) {
    case "add": {
      await addCommand(tasks, arg1);
      break;
    }

    case "list": {
      await listCommand(tasks, arg1 as Task["status"] | undefined);
      break;
    }

    case "delete": {
      await deleteCommand(tasks, arg1);
      break;
    }

    case "update": {
      await updateCommand(arg1, arg2, tasks);
      break;
    }

    case "mark-in-progress": {
      await updateStatusCommand(arg1, "in-progress", tasks);
      break;
    }

    case "mark-done": {
      await updateStatusCommand(arg1, "done", tasks);
      break;
    }

    case "mark-init": {
      await updateStatusCommand(arg1, "todo", tasks);
      break;
    }
  }
}

run();
