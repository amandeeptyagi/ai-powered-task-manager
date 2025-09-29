import express from "express";
import { protect } from "../middleware/authMiddleware.js"

import { 
  login,
  getUser,
  logout
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.get("/user", protect, getUser);
router.post("/logout", protect, logout);

export default router;
