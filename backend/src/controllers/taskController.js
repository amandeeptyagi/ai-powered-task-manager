import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks (only user's)
export const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        status: true,
        userId: true,
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};


// Get single task (only if belongs to user)
export const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: { id, userId },
      include: { subtasks: true },
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, status } = req.body;

    // ensure task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { title, description, status },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    await prisma.task.delete({ where: { id } });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
