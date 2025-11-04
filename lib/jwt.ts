import { SignJWT, jwtVerify, decodeJwt } from 'jose';

// Use environment variable or throw error if not set
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function getJWTSecret(): Uint8Array {
  if (!JWT_SECRET) {
    console.error('CRITICAL: JWT_SECRET environment variable is not set!');
    throw new Error('JWT_SECRET environment variable is not set. Please add it to your .env file.');
  }
  // Convert secret string to Uint8Array for jose
  return new TextEncoder().encode(JWT_SECRET);
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  sessionId?: string;
  iat?: number;
  exp?: number;
}

/**
 * Sign a JWT token with user information
 */
export async function signToken(userId: string, email: string, role: string, sessionId?: string): Promise<string> {
  try {
    const secret = getJWTSecret();
    const payload = {
      userId,
      email,
      role,
      ...(sessionId && { sessionId }),
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRES_IN)
      .sign(secret);

    return token;
  } catch (error) {
    console.error('Error signing JWT token:', error);
    throw error;
  }
}

/**
 * Verify and decode a JWT token
 * Returns null if token is invalid or expired
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    console.log('🟠 JWT: Starting token verification...');
    console.log('🟠 JWT: Token length:', token?.length);
    console.log('🟠 JWT: JWT_SECRET exists:', !!JWT_SECRET);
    console.log('🟠 JWT: JWT_SECRET length:', JWT_SECRET?.length);
    
    const secret = getJWTSecret();
    console.log('🟠 JWT: Secret retrieved successfully');
    
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    
    console.log('✅ JWT: Token verified successfully');
    console.log('🟠 JWT: User ID from token:', payload.userId);
    
    return payload as TokenPayload;
  } catch (error) {
    // Token is invalid, expired, or malformed
    console.error('🔴 JWT: Token verification failed!');
    console.error('🔴 JWT: Error name:', (error as Error).name);
    console.error('🔴 JWT: Error message:', (error as Error).message);
    
    if ((error as Error).name === 'JWTExpired') {
      console.error('🔴 JWT: Token has expired');
    } else if ((error as Error).name === 'JWSInvalid') {
      console.error('🔴 JWT: Token is malformed or invalid');
    } else {
      console.error('🔴 JWT: Unknown JWT error:', error);
    }
    
    return null;
  }
}

/**
 * Decode token without verification (use only for reading non-sensitive data)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    return decodeJwt(token) as TokenPayload;
  } catch (error) {
    return null;
  }
}

