import { createResult, formatGreeting } from "<%= scope %>/shared";
import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/hello", (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name : "world";
  res.json(createResult({ greeting: formatGreeting(name) }));
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
