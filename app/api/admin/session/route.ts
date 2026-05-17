import { adminAuth } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'admin-session';
const FIVE_DAYS = 60 * 60 * 24 * 5;

function isAllowed(email: string | undefined) {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowlist.length === 0) return false;
  return allowlist.includes(email.toLowerCase());
}

export async function POST(req: Request) {
  const { idToken } = await req.json();
  if (!idToken) {
    return NextResponse.json({ error: 'idToken required' }, { status: 400 });
  }

  const decoded = await adminAuth.verifyIdToken(idToken);
  if (!isAllowed(decoded.email)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn: FIVE_DAYS * 1000,
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: FIVE_DAYS,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
