import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebaseAdmin';

export const SESSION_COOKIE = 'admin-session';

export type AdminSession = { uid: string; email: string };

function isAllowed(email: string | undefined) {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email.toLowerCase());
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const sessionCookie = store.get(SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!isAllowed(decoded.email)) return null;
    return { uid: decoded.uid, email: decoded.email! };
  } catch {
    return null;
  }
}
