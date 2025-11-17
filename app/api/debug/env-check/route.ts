import { NextResponse } from 'next/server';

// This endpoint helps debug environment variable issues
// REMOVE THIS IN PRODUCTION!
export async function GET() {
  const checks = {
    JWT_SECRET: !!process.env.JWT_SECRET,
    JWT_SECRET_LENGTH: process.env.JWT_SECRET?.length || 0,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || 'not set',
    POSTGRES_URL: !!process.env.POSTGRES_URL,
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: 'Environment Variables Check',
    checks,
    warnings: [
      !checks.JWT_SECRET && 'JWT_SECRET is missing!',
      checks.JWT_SECRET_LENGTH < 32 && 'JWT_SECRET is too short (should be 32+ characters)',
      !checks.POSTGRES_URL && 'POSTGRES_URL is missing!',
    ].filter(Boolean),
  });
}









