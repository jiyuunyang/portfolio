import { adminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export type Experience = {
  id: string; // 문서명
  company: string; // (주)데이터비
  role: string; // 프론트엔드 개발자
  tasks: string[];
  timeEnd: Timestamp;
  timeStart: Timestamp;
  order: number;
};

export async function getExperience(): Promise<Experience[]> {
  const snapshot = await adminDb
    .collection('experience')
    .orderBy('order', 'asc')
    .get();

  const experiences: Experience[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Experience, 'id'>),
  }));

  return experiences;
}
