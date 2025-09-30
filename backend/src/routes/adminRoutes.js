import express from "express";
import {
  deleteAdminProfile
} from "../controllers/adminController.js";

import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//auth middleware
router.use(protect, allowRoles("ADMIN"));

// PROFILE
router.delete("/delete-profile", deleteAdminProfile);

export default router;
