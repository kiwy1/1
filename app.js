import http from "http";

const PORT = process.env.PORT || 3000;
const tasks = [];

function parseUrl(url) {
  const [path, query] = url.split("?");
  const parts = path.split("/").filter(Boolean);
  return { path, parts };
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const { path, parts } = parseUrl(url);

  if (method === "GET" && parts[0] === "tasks" && parts.length === 1) {
    return sendJson(res, 200, tasks);
  }

  if (method === "GET" && parts[0] === "tasks" && parts.length === 2) {
    const id = parseInt(parts[1], 10);
    const task = tasks.find((t) => t.id === id);
    if (!task) return sendJson(res, 404, { error: "Task not found" });
    return sendJson(res, 200, task);
  }

  if (method === "POST" && parts[0] === "tasks" && parts.length === 1) {
    try {
      const body = await parseBody(req);
      const title = body.title;
      if (!title || typeof title !== "string") {
        return sendJson(res, 400, { error: "title is required" });
      }
      const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      const task = { id, title: title.trim() };
      tasks.push(task);
      return sendJson(res, 201, task);
    } catch (e) {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }
  }

  if (method === "PATCH" && parts[0] === "tasks" && parts.length === 2) {
    const id = parseInt(parts[1], 10);
    const task = tasks.find((t) => t.id === id);
    if (!task) return sendJson(res, 404, { error: "Task not found" });
    try {
      const body = await parseBody(req);
      if (body.title !== undefined) task.title = String(body.title).trim();
      return sendJson(res, 200, task);
    } catch (e) {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }
  }

  if (method === "DELETE" && parts[0] === "tasks" && parts.length === 2) {
    const id = parseInt(parts[1], 10);
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return sendJson(res, 404, { error: "Task not found" });
    tasks.splice(idx, 1);
    res.writeHead(204);
    res.end();
    return;
  }

  sendJson(res, 404, { error: "Not Found" });
});

server.listen(PORT, () => {
  console.log(`Todo API server: http://localhost:${PORT}`);
});
