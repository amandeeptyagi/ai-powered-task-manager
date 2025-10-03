import express from 'express';
import {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//auth middleware
router.use(protect, allowRoles("USER"));

router.post('/create', createTask);
router.get('/', getUserTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
