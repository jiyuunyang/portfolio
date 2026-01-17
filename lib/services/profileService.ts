import { adminDb } from '@/lib/firebaseAdmin';

export type Profile = {
  about: string;
  contact: { email: string; github: string; repo: string };
  skills: string[];
};

export async function getProfile(): Promise<Profile | null> {
  const docRef = adminDb.collection('profile').doc('main');
  const snap = await docRef.get();

  if (!snap.exists) return null;
  return snap.data() as Profile;
}
