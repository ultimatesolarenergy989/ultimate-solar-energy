import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth_token')?.value;

    // If token exists, delete the session from database
    if (token) {
      const payload = await verifyToken(token);
      
      if (payload && payload.sessionId) {
        // Delete specific session
        await prisma.session.delete({
          where: { id: payload.sessionId },
        }).catch(() => {
          // Session might already be deleted, ignore error
        });
      }
    }

    // Create response
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.delete('auth_token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear the cookie even if there's an error
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    response.cookies.delete('auth_token');
    return response;
  }
}

