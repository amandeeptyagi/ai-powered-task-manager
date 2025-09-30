import express from "express";

import {
    userRegister,
    deleteUserProfile,
} from "../controllers/userController.js";

import { protect, allowRoles } from "../middleware/authMiddleware.js";


const router = express.Router();

//register
router.post("/register", userRegister);

//auth middleware
router.use(protect, allowRoles("USER"));

// PROFILE
router.delete("/delete-profile", deleteUserProfile)

export default router;
