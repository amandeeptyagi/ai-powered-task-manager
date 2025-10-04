import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// REGISTER
export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await prisma.user.findUnique({
    where: { email },
  });
  if (existing) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER",
    },
  });
  generateToken(res, user.id, user.role, user.name);
  res.status(201).json({
    message: "User registered",
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    }
  });
});

// User Profile Delete
export const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.user.id,
    },
  });

  // clear cookies
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({
    message: "User profile deleted",
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    }
  });
});