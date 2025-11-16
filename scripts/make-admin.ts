// scripts/make-admin.ts
// Simple script to make the first user an admin
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
};

async function makeAdmin() {
  try {
    // Get the first user (ordered by creation date)
    const firstUser = await prisma.user.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!firstUser) {
      console.log('❌ No users found in database!');
      process.exit(1);
    }

    // Update to admin
    await prisma.user.update({
      where: { id: firstUser.id },
      data: { role: 'admin' },
    });

    console.log(`${colors.green}✅ User updated to admin:${colors.reset}`);
    console.log(`   Email: ${firstUser.email}`);
    console.log(`   Name: ${firstUser.name || 'N/A'}`);
    console.log(`\n${colors.cyan}🚀 Now run: pnpm import-blogs${colors.reset}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();

