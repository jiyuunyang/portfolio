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

// 관리자 폼에서 사용 (Timestamp 대신 yyyy-MM 문자열)
export type ExperienceInput = {
  company: string;
  role: string;
  tasks: string[];
  timeStart: string; // yyyy-MM
  timeEnd: string; // yyyy-MM
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

export async function getAllExperienceInputs(): Promise<
  (ExperienceInput & { id: string })[]
> {
  const list = await getExperience();
  return list.map((e) => ({
    id: e.id,
    company: e.company,
    role: e.role,
    tasks: e.tasks,
    order: e.order,
    timeStart: timestampToYearMonth(e.timeStart),
    timeEnd: timestampToYearMonth(e.timeEnd),
  }));
}

export async function getExperienceById(
  id: string,
): Promise<(ExperienceInput & { id: string }) | null> {
  const snap = await adminDb.collection('experience').doc(id).get();
  if (!snap.exists) return null;
  const data = snap.data() as Omit<Experience, 'id'>;
  return {
    id: snap.id,
    company: data.company,
    role: data.role,
    tasks: data.tasks,
    order: data.order,
    timeStart: timestampToYearMonth(data.timeStart),
    timeEnd: timestampToYearMonth(data.timeEnd),
  };
}

function timestampToYearMonth(ts: Timestamp): string {
  const date = ts.toDate();
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function yearMonthToTimestamp(value: string): Timestamp {
  // 'YYYY-MM' → 해당 월 1일 UTC
  const [yearStr, monthStr] = value.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  if (!year || !month) {
    throw new Error(`잘못된 날짜 형식입니다 (YYYY-MM): ${value}`);
  }
  const date = new Date(Date.UTC(year, month - 1, 1));
  return Timestamp.fromDate(date);
}

function sanitize(input: ExperienceInput) {
  return {
    company: input.company.trim(),
    role: input.role.trim(),
    tasks: input.tasks.map((t) => t.trim()).filter(Boolean),
    order: Number(input.order) || 0,
    timeStart: yearMonthToTimestamp(input.timeStart),
    timeEnd: yearMonthToTimestamp(input.timeEnd),
  };
}

export async function createExperience(
  id: string,
  input: ExperienceInput,
): Promise<void> {
  const docId = id.trim();
  if (!docId) throw new Error('id가 필요합니다.');
  const docRef = adminDb.collection('experience').doc(docId);
  const existing = await docRef.get();
  if (existing.exists) {
    throw new Error(`이미 존재하는 id입니다: ${docId}`);
  }
  await docRef.set(sanitize(input));
}

export async function updateExperience(
  id: string,
  input: ExperienceInput,
): Promise<void> {
  await adminDb.collection('experience').doc(id).set(sanitize(input));
}

export async function deleteExperience(id: string): Promise<void> {
  await adminDb.collection('experience').doc(id).delete();
}
