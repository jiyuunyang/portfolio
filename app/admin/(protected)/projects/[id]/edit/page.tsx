import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectForm from '../../ProjectForm';
import {
  getProjectDetail,
  ProjectInput,
} from '@/lib/services/projectService';
import { adminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const detail = await getProjectDetail(id);
  if (!detail) notFound();

  // 카드 전용 필드 (cardFeatures, type, order)는 ProjectDetail에 없으므로 따로 가져옴
  const snap = await adminDb.collection('projects').doc(id).get();
  const raw = snap.data() ?? {};

  const initialValues: ProjectInput = {
    title: detail.title ?? '',
    summaryImage: detail.summaryImage ?? '',
    summaryDesc: detail.summaryDesc ?? '',
    period: detail.period ?? '',
    company: detail.company ?? '',
    mainRole: detail.mainRole ?? '',
    platform: detail.platform ?? '',
    stacks: detail.stacks ?? '',
    context: detail.context ?? '',
    roles: detail.roles ?? [],
    features: detail.features ?? [],
    technicalChallenge: detail.technicalChallenge ?? [],
    result: detail.result ?? [],
    link: detail.link ?? '',
    cardFeatures: raw.cardFeatures ?? [],
    type: raw.type ?? 'work',
    order: raw.order ?? 0,
  };

  return (
    <div className='flex flex-col gap-4'>
      <Link
        href='/admin/projects'
        className='text-sm text-gray-500 hover:underline'
      >
        ← 목록으로
      </Link>
      <h1 className='text-2xl font-bold'>
        프로젝트 수정 <span className='font-mono text-base text-gray-500'>({id})</span>
      </h1>
      <ProjectForm
        mode='edit'
        initialId={id}
        initialValues={initialValues}
      />
    </div>
  );
}
