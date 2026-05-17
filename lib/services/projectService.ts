import { adminDb } from '@/lib/firebaseAdmin';

export type Project = {
  projectId: string;
  title: string;
  summaryDesc: string;
  cardFeatures: string[];
  stacks: string;
  type: 'primary' | 'personal' | 'work';
  order: number;
};

export type ProjectDetail = {
  projectId: string;
  title: string;
  summaryImage: string;
  summaryDesc: string;
  period: string; // 기간: 2024.01 – 2024.09
  company: string; // 소속: 먼슬리키친
  mainRole: string; // 역할: 프론트엔드 개발
  platform: string; // 플랫폼: Android (Table Order Device)
  stacks: string; // 기술 스택: Dart, Flutter
  context: string; // 기존 테이블오더 서비스는...
  roles: string[]; // 담당 역할
  features: { title: string; details: string[] }[]; // 주요 구현 내용
  technicalChallenge?: string[]; //기술적 고민
  result: string[]; // 결과 및 성과
  link?: string; // 관련 링크
};

// 카드/상세 모두 포함하는 입력 타입 (관리자용)
export type ProjectInput = Omit<ProjectDetail, 'projectId'> & {
  cardFeatures: string[];
  type: 'primary' | 'personal' | 'work';
  order: number;
};

export async function getProjects(): Promise<Project[]> {
  const snapshot = await adminDb
    .collection('projects')
    .orderBy('order', 'asc')
    .get();

  const projects: Project[] = snapshot.docs.map((doc) => {
    const { title, summaryDesc, stacks, cardFeatures, type, order } =
      doc.data();

    return {
      projectId: doc.id,
      title,
      summaryDesc,
      stacks,
      cardFeatures,
      type,
      order,
    };
  });

  return projects;
}

export async function getProjectDetail(
  projectId: string,
): Promise<ProjectDetail | null> {
  const docRef = adminDb.collection('projects').doc(projectId);
  const snap = await docRef.get();

  if (!snap.exists) return null;
  return { projectId: snap.id, ...(snap.data() as Omit<ProjectDetail, 'projectId'>) };
}

// 관리자 페이지에서 모든 필드를 함께 가져오기 위한 함수
export async function getAllProjectInputs(): Promise<
  (ProjectInput & { projectId: string })[]
> {
  const snapshot = await adminDb
    .collection('projects')
    .orderBy('order', 'asc')
    .get();

  return snapshot.docs.map((doc) => ({
    projectId: doc.id,
    ...(doc.data() as ProjectInput),
  }));
}

const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const arr = <T>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);

function sanitize(input: ProjectInput): ProjectInput {
  return {
    title: s(input.title),
    summaryImage: s(input.summaryImage),
    summaryDesc: s(input.summaryDesc),
    period: s(input.period),
    company: s(input.company),
    mainRole: s(input.mainRole),
    platform: s(input.platform),
    stacks: s(input.stacks),
    context: s(input.context),
    roles: arr(input.roles).map(s).filter(Boolean),
    features: arr(input.features)
      .map((f) => ({
        title: s(f?.title),
        details: arr(f?.details).map(s).filter(Boolean),
      }))
      .filter((f) => f.title || f.details.length > 0),
    technicalChallenge: arr(input.technicalChallenge).map(s).filter(Boolean),
    result: arr(input.result).map(s).filter(Boolean),
    link: s(input.link),
    cardFeatures: arr(input.cardFeatures).map(s).filter(Boolean),
    type: input.type ?? 'work',
    order: Number(input.order) || 0,
  };
}

export async function createProject(
  projectId: string,
  input: ProjectInput,
): Promise<void> {
  const id = projectId.trim();
  if (!id) throw new Error('projectId가 필요합니다.');
  const docRef = adminDb.collection('projects').doc(id);
  const existing = await docRef.get();
  if (existing.exists) {
    throw new Error(`이미 존재하는 projectId입니다: ${id}`);
  }
  await docRef.set(sanitize(input));
}

export async function updateProject(
  projectId: string,
  input: ProjectInput,
): Promise<void> {
  const docRef = adminDb.collection('projects').doc(projectId);
  await docRef.set(sanitize(input));
}

export async function deleteProject(projectId: string): Promise<void> {
  await adminDb.collection('projects').doc(projectId).delete();
}
