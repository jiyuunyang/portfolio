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
  return snap.data() as ProjectDetail;
}
