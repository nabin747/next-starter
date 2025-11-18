import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    region: process.env.VERCEL_REGION ?? 'local',
  });
}
