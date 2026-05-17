import Link from 'next/link';
import ProjectForm from '../ProjectForm';
import { ProjectInput } from '@/lib/services/projectService';

const empty: ProjectInput = {
  title: '',
  summaryImage: '',
  summaryDesc: '',
  period: '',
  company: '',
  mainRole: '',
  platform: '',
  stacks: '',
  context: '',
  roles: [],
  features: [],
  technicalChallenge: [],
  result: [],
  link: '',
  cardFeatures: [],
  type: 'work',
  order: 0,
};

export default function NewProjectPage() {
  return (
    <div className='flex flex-col gap-4'>
      <Link
        href='/admin/projects'
        className='text-sm text-gray-500 hover:underline'
      >
        ← 목록으로
      </Link>
      <h1 className='text-2xl font-bold'>새 프로젝트</h1>
      <ProjectForm mode='create' initialValues={empty} />
    </div>
  );
}
