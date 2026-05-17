import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExperienceForm from '../../ExperienceForm';
import { getExperienceById } from '@/lib/services/experienceService';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;
  const data = await getExperienceById(id);
  if (!data) notFound();

  const { id: _id, ...initialValues } = data;
  void _id;

  return (
    <div className='flex flex-col gap-4'>
      <Link
        href='/admin/experience'
        className='text-sm text-gray-500 hover:underline'
      >
        ← 목록으로
      </Link>
      <h1 className='text-2xl font-bold'>
        경력 수정 <span className='font-mono text-base text-gray-500'>({id})</span>
      </h1>
      <ExperienceForm
        mode='edit'
        initialId={id}
        initialValues={initialValues}
      />
    </div>
  );
}
