import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedAdminResponse } from '@/lib/auth-admin';
import { isDbConnected } from '@/db';

export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return unauthorizedAdminResponse();
  }

  const startTime = Date.now();
  let dbStatus = 'disconnected';

  if (isDbConnected) {
    dbStatus = 'connected';
  }

  return NextResponse.json({
    status: 'healthy',
    service: 'inkwell-phonics',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    responseTimeMs: Date.now() - startTime,
    diagnostics: {
      database: { status: dbStatus },
      memory: {
        rssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
        heapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
    },
  });
}
