import { NextResponse } from 'next/server';

// Simple test endpoint to check if API routes are working
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API is working',
    timestamp: new Date().toISOString(),
  });
}

export async function POST() {
  return NextResponse.json({
    status: 'ok',
    message: 'POST request received',
    timestamp: new Date().toISOString(),
  });
}











