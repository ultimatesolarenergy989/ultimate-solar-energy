import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import { getClientIp, getUserAgent, checkRateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
  console.log('🔵 Login endpoint called');
  
  try {
    const { email: rawEmail, password } = await request.json();
    const email = rawEmail?.trim().toLowerCase();
    console.log('🔵 Login attempt for:', email);

    // Rate limiting - 5 attempts per 15 minutes per IP
    const clientIp = getClientIp(request);
    console.log('🔵 Client IP:', clientIp);
    
    const rateLimit = checkRateLimit(`login:${clientIp}`, 5, 15 * 60 * 1000);
    console.log('🔵 Rate limit check:', rateLimit);
    
    if (!rateLimit.allowed) {
      console.log('🔴 Rate limit exceeded');
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: new Date(rateLimit.resetAt).toISOString()
        },
        { status: 429 }
      );
    }

    // Validate input
    if (!email || !password) {
      console.log('🔴 Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    console.log('🔵 Searching for user in database...');
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log('🔵 User found:', !!user);

    if (!user) {
      console.log('🔴 User not found');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    console.log('🔵 Verifying password...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔵 Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Get client info
    console.log('🔵 Getting client info...');
    const userAgent = getUserAgent(request);
    console.log('🔵 User agent:', userAgent);
    
    // Create session in database
    console.log('🔵 Creating session in database...');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: '', // Will be updated after JWT creation
        expiresAt,
        ipAddress: clientIp,
        userAgent,
      },
    });
    console.log('✅ Session created:', session.id);

    // Create JWT token with session ID
    console.log('🔵 Signing JWT token...');
    let jwtToken: string;
    try {
      jwtToken = await signToken(user.id, user.email, user.role, session.id);
      console.log('✅ JWT token signed successfully');
    } catch (jwtError) {
      console.error('🔴 JWT signing error:', jwtError);
      // Clean up session if JWT creation fails
      await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
      return NextResponse.json(
        { error: 'Authentication service error. Please contact support.' },
        { status: 500 }
      );
    }

    // Update session with JWT token
    console.log('🔵 Updating session with JWT token...');
    await prisma.session.update({
      where: { id: session.id },
      data: { token: jwtToken },
    });
    console.log('✅ Session updated with JWT');

    // Clean up expired sessions for this user (housekeeping)
    console.log('🔵 Cleaning up expired sessions...');
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
        expiresAt: { lt: new Date() },
      },
    });
    console.log('✅ Expired sessions cleaned up');

    // Return user data (excluding password)
    console.log('🔵 Preparing response...');
    const { password: _, ...userWithoutPassword } = user;

    // Create response with user data
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie with JWT token
    console.log('🔵 Setting HTTP-only cookie...');
    response.cookies.set('auth_token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Strict for better CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    console.log('✅ Login successful! Sending response...');
    return response;
  } catch (error) {
    console.error('🔴 Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}

