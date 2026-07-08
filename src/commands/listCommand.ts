import type { Task } from "../types";

export async function listCommand(tasks: Task[], filter?: Task["status"]): Promise<void> {
  if (!tasks || tasks.length === 0) {
    console.log("📌 Your task list is completely empty.");
    return;
  }

  let filtered = tasks;

  if (filter) {
    const cleanFilter = filter.toLowerCase().trim();

    if (cleanFilter !== "todo" && cleanFilter !== "in-progress" && cleanFilter !== "done") {
      console.error("❌ Error: Invalid status filter. Use 'todo', 'in-progress', or 'done'.");
      return;
    }

    filtered = tasks.filter((t) => t.status === cleanFilter);
  }

  if (filtered.length === 0) {
    console.log(`📌 No tasks found with status '${filter}'.`);
    return;
  }

  console.log(`\n=== TASKS LIST (${filter ? filter.toUpperCase() : "ALL"}) ===`);
  filtered.forEach((t) => {
    const statusIcon = t.status === "done" ? "🟢" : t.status === "in-progress" ? "🟡" : "⚪";
    console.log(`[ID: ${t.id}] ${statusIcon} [${t.status.toUpperCase()}] ${t.description} (Created: ${t.createdAt})`);
  });
  console.log("");
}
