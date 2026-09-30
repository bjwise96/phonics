import { NextRequest, NextResponse } from 'next/server';

export function verifyAdminAuth(req: NextRequest): boolean {
  const secretKey = process.env.PHONICS_ADMIN_SECRET;
  if (!secretKey) {
    // If not configured, deny access by default for security
    return false;
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.substring(7).trim();
  return token === secretKey;
}

export function unauthorizedAdminResponse() {
  return NextResponse.json(
    { error: 'Unauthorized. Invalid or missing PHONICS_ADMIN_SECRET token.' },
    { status: 401 }
  );
}
