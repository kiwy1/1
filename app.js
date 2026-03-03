import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();
const tasks = [];

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body || {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }

  const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const task = { id, title: title.trim() };
  tasks.push(task);

  res.status(201).json(task);
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title } = req.body || {};
  if (title !== undefined) {
    task.title = String(title).trim();
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(idx, 1);
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Todo API server: http://localhost:${PORT}`);
});
