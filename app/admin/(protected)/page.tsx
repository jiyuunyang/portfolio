import Link from 'next/link';
import { getProjects } from '@/lib/services/projectService';
import { getExperience } from '@/lib/services/experienceService';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [projects, experiences] = await Promise.all([
    getProjects(),
    getExperience(),
  ]);

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl font-bold'>대시보드</h1>

      <div className='grid grid-cols-1 tb:grid-cols-2 gap-4'>
        <Link
          href='/admin/projects'
          className='border rounded-lg p-5 bg-white dark:bg-gray-800 hover:shadow'
        >
          <p className='text-sm text-gray-500'>프로젝트</p>
          <p className='text-3xl font-bold mt-2'>{projects.length}</p>
          <p className='text-sm mt-2 text-blue-500'>관리하러 가기 →</p>
        </Link>

        <Link
          href='/admin/experience'
          className='border rounded-lg p-5 bg-white dark:bg-gray-800 hover:shadow'
        >
          <p className='text-sm text-gray-500'>경력</p>
          <p className='text-3xl font-bold mt-2'>{experiences.length}</p>
          <p className='text-sm mt-2 text-blue-500'>관리하러 가기 →</p>
        </Link>
      </div>
    </div>
  );
}
