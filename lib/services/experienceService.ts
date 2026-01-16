import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Experience = {
  id: string; // 문서명
  company: string; // (주)데이터비
  role: string; // 프론트엔드 개발자
  tasks: string[];
  timeEnd: Timestamp;
  timeStart: Timestamp;
  order: number;
};

export async function getProjects(): Promise<Experience[]> {
  const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);

  // 배열 형태로 변환
  const projects: Experience[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Experience, 'id'>),
  }));

  return projects;
}
