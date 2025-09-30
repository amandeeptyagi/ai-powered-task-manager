import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function createDefaultAdmin() {
  try {
    const adminName = 'Admin';
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    // Check if the admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await prisma.admin.create({
        data: {
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });

      console.log('Default admin created.');
    } else {
      console.log('Admin already exists.');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}
