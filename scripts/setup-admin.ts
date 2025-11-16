// scripts/setup-admin.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
};

async function setupAdmin() {
  try {
    log.info('🔍 Checking for admin users...\n');

    // Check for existing admin
    const adminUser = await prisma.user.findFirst({
      where: { role: 'admin' },
    });

    if (adminUser) {
      log.success(`Admin user already exists: ${adminUser.email}`);
      log.info(`User ID: ${adminUser.id}`);
      log.info(`Name: ${adminUser.name || 'N/A'}`);
      console.log('\n✅ You can now run: pnpm import-blogs');
      return;
    }

    // Check for any users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    if (allUsers.length === 0) {
      log.warning('No users found in database!');
      console.log('\n📝 Please create a user first:');
      console.log(`   1. Go to: ${colors.cyan}http://localhost:3000/sign-up${colors.reset}`);
      console.log('   2. Register a new account');
      console.log('   3. Run this script again: pnpm setup-admin');
      console.log('   4. Then run: pnpm import-blogs\n');
      return;
    }

    // Show all users
    console.log(`\n📋 Found ${allUsers.length} user(s):\n`);
    allUsers.forEach((user, index) => {
      console.log(`${colors.cyan}[${index + 1}]${colors.reset}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name || 'N/A'}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   ID: ${user.id}`);
      console.log('');
    });

    // Prompt user to select
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise<string>((resolve) => {
      rl.question(
        `${colors.yellow}Which user should be admin? Enter number [1-${allUsers.length}]:${colors.reset} `,
        resolve
      );
    });

    rl.close();

    const selectedIndex = parseInt(answer.trim()) - 1;

    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= allUsers.length) {
      log.error('Invalid selection!');
      process.exit(1);
    }

    const selectedUser = allUsers[selectedIndex];

    // Update user to admin
    await prisma.user.update({
      where: { id: selectedUser.id },
      data: { role: 'admin' },
    });

    log.success(`\n✅ User updated to admin: ${selectedUser.email}`);
    console.log(`\n🚀 Now you can run: ${colors.cyan}pnpm import-blogs${colors.reset}\n`);
  } catch (error) {
    log.error(`Error: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdmin();

