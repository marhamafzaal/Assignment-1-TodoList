const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Sample task list (in-memory)
let tasks = [];
let nextId = 1;

// POST /addTask
app.post("/addTask", (req, res) => {
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({ error: "taskName is required" });
  }
  const newTask = { id: nextId++, taskName };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// DELETE /task/:id
app.delete("/task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
