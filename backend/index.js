const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || "topsecret";

// ---------- User Registration ----------
app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === "ADMIN" ? "ADMIN" : "USER",
      },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------- User Login ----------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// ---------- Middleware ----------
function auth(requiredRole = null) {
  return (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "No token provided" });

    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
}

// ---------- Task Routes ----------
app.post("/api/tasks", auth(), async (req, res) => {
  const { title, description, status } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      status: status || "TODO",
      userId: req.user.userId,
    },
  });
  res.json(task);
});

app.get("/api/tasks", auth(), async (req, res) => {
  if (req.user.role === "ADMIN") {
    const tasks = await prisma.task.findMany({ include: { user: true } });
    res.json(tasks);
  } else {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
    });
    res.json(tasks);
  }
});

app.put("/api/tasks/:id", auth(), async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await prisma.task.findUnique({ where: { id: Number(id) } });
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (req.user.role !== "ADMIN" && task.userId !== req.user.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updated = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, status },
  });
  res.json(updated);
});

app.delete("/api/tasks/:id", auth(), async (req, res) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({ where: { id: Number(id) } });
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (req.user.role !== "ADMIN" && task.userId !== req.user.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await prisma.task.delete({ where: { id: Number(id) } });
  res.json({ message: "Task deleted" });
});

// ---------- Server ----------
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
