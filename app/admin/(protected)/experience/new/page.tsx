import Link from 'next/link';
import ExperienceForm from '../ExperienceForm';
import { ExperienceInput } from '@/lib/services/experienceService';

const empty: ExperienceInput = {
  company: '',
  role: '',
  tasks: [],
  timeStart: '',
  timeEnd: '',
  order: 0,
};

export default function NewExperiencePage() {
  return (
    <div className='flex flex-col gap-4'>
      <Link
        href='/admin/experience'
        className='text-sm text-gray-500 hover:underline'
      >
        ← 목록으로
      </Link>
      <h1 className='text-2xl font-bold'>새 경력</h1>
      <ExperienceForm mode='create' initialValues={empty} />
    </div>
  );
}
