import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export type Profile = {
  about: string;
  contact: { email: string; github: string };
  hero: string[];
  skills: string[];
};

export async function getProfile(): Promise<Profile | null> {
  const docRef = doc(db, 'profile', 'main'); // profile 컬렉션, main 도큐먼트
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return docSnap.data() as Profile;
}
