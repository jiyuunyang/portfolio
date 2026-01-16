import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Project = {
  id: string; // 문서명(프로젝트 영어명)
  title: string; // 먼키 테이블오더 앱
  summaryImage: string;
  summaryDesc: string;
  cardFeatures: string[];
  type: 'personal' | 'work';
  order: number;
  period: string; // 기간: 2024.01 – 2024.09
  company: string; // 소속: 먼슬리키친
  mainRole: string; // 역할: 프론트엔드 개발
  platform: string; // 플랫폼: Android (Table Order Device)
  stacks: string; // 기술 스택: Dart, Flutter
  context: string; // 기존 테이블오더 서비스는 매장 환경(와이파이 불안정, 기기 관리, 다중 주문 상황)에서 다양한 오류 상황이 발생하고 있었고...
  roles: string[]; // 담당 역할
  features: { title: string; details: string[] }[]; // 주요 구현 내용
  technicalChallenge: string[]; //기술적 고민
  result: string[]; // 결과 및 성과
  retrospect: string[]; // 회고
};

export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);

  // 배열 형태로 변환
  const projects: Project[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Project, 'id'>),
  }));

  return projects;
}
