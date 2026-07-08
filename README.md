# Task Tracker CLI 🟢🟡⚪

A robust, production-ready Command Line Interface (CLI) application built to track and manage your daily tasks. This project strictly adheres to the backend roadmap challenges from roadmap.sh.

Developed using **TypeScript** and powered by **Bun**, this application features a decoupled, command-oriented architecture, a defensive data-validation layer, and a native JSON-based persistence system.

---

## 🚀 Features

- **Full CRUD:** Add, update, view, and delete tasks instantly.
- **Status Management:** Move tasks dynamically between `todo`, `in-progress`, and `done`.
- **Advanced Filtering:** List your tasks globally or filter them selectively by their current status.
- **Resilient Design:** Zero external dependencies; utilizes Bun's native high-performance file system APIs.
- **Defensive Architecture:** Built-in semantic error handlers to catch invalid arguments or corrupt data gracefully.

---

## 🛠️ Tech Stack & Requirements

- **Runtime:** [Bun](https://bun.sh/) (v1.0.0 or higher)
- **Language:** TypeScript
- **OS Tested:** Ubuntu 24.04.4 LTS / Linux

---

## 📦 Installation & Setup

1. Clone this repository to your local machine:

```bash
git clone https://github.com/gabo2447/task-tracker-cli.git
cd task-tracker-cli
```

2. Install dependencies (if you expand the project, otherwise Bun runs natively):

```bash
bun install
```

## 📖 Usage & Examples

Run the application using `bun src/main.ts` followed by the command and its required positional arguments.

### 1. Adding a New Task

Creates a task with a unique ID, sets the status to todo, and tracks timestamps.

```bash
bun src/main.ts add "Buy a new car"

# Output: ✅ Task added successfully: {
#  "id": 1,
#  "description": "Buy a new car",
#  "status": "todo",
#  "createdAt": "2026-07-08T01:02:48.609Z",
#  "updatedAt": "2026-07-08T01:02:48.609Z"
#}
```

### 2. Updating a Task Description

```bash
bun src/main.ts update 1 "Buy a new car and cook dinner"
# Output: ✅ Task with ID 1 has been updated successfully.
```

### 3. Deleting a Task

```bash
bun src/main.ts delete 1
# Output: ✅ Task with ID 1 has been deleted successfully.
```

### 4. Updating Task Status

```bash
# Mark as in-progress
bun src/main.ts mark-in-progress 1

# Mark as done
bun src/main.ts mark-done 1

# Reset back to todo
bun src/main.ts mark-init 1
```

### 5. Listing Tasks

```bash
# List all tasks
bun src/main.ts list

# Filter tasks by specific status
bun src/main.ts list todo
bun src/main.ts list in-progress
bun src/main.ts list done
```

## 💾 Task Data Structure

All records are written cleanly in a local `task.json` database in the root folder, modeling the following strict chema:

```json
{
  "id": 1,
  "description": "Buy groceries and cook dinner",
  "status": "in-progress",
  "createdAt": "2026-07-07 21:00:31",
  "updatedAt": "2026-07-07 21:05:12"
}
```

# 🏗️ Architecture Overview

The project follows a modular layout designed for scalability:

- **src/main.ts:** Application orchestrator and global error catching.
- **src/repository.ts:** Pure infrastructure layer managing isolated JSON I/O operations.
- **src/commands/:** Domain logic split into granular, single-responsibility files.
- **src/handlers/:** Centralized business exception handler (ErrorNotFound, ErrorValidation).
- **src/types.ts:** Strict compilation-level type contracts.

---

Developed with ☕ and discipline. Happy coding!
