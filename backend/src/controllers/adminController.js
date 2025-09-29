import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Admin Profile Delete
export const deleteAdminProfile = asyncHandler(async (req, res) => {
  const admin = await prisma.admin.delete({
    where: { id: req.user.id },
  });
  res.json({ message: "Admin profile deleted", admin: admin });
});