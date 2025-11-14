import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Admin Profile Delete
export const deleteAdminProfile = asyncHandler(async (req, res) => {
  const admin = await prisma.admin.delete({
    where: { id: req.user.id },
  });

  // clear cookies
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({
    message: "Admin profile deleted",
    admin: {
      id: admin.id,
      name: admin.name,
      role: admin.role,
    }
  });
});