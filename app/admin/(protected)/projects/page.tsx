import Link from 'next/link';
import { getAllProjectInputs } from '@/lib/services/projectService';
import DeleteProjectButton from './DeleteProjectButton';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getAllProjectInputs();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>프로젝트</h1>
        <Link
          href='/admin/projects/new'
          className='bg-gray-900 text-white px-3 py-2 rounded text-sm hover:opacity-80 dark:bg-gray-100 dark:text-gray-900'
        >
          + 새 프로젝트
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className='text-gray-500'>등록된 프로젝트가 없습니다.</p>
      ) : (
        <div className='border rounded-lg overflow-hidden bg-white dark:bg-gray-800'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-100 dark:bg-gray-700 text-left'>
              <tr>
                <th className='px-3 py-2'>순서</th>
                <th className='px-3 py-2'>ID</th>
                <th className='px-3 py-2'>제목</th>
                <th className='px-3 py-2'>타입</th>
                <th className='px-3 py-2 w-32'>관리</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.projectId}
                  className='border-t border-gray-200 dark:border-gray-700'
                >
                  <td className='px-3 py-2'>{p.order}</td>
                  <td className='px-3 py-2 font-mono text-xs'>
                    {p.projectId}
                  </td>
                  <td className='px-3 py-2 font-medium'>{p.title}</td>
                  <td className='px-3 py-2'>
                    <span className='inline-block px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700'>
                      {p.type}
                    </span>
                  </td>
                  <td className='px-3 py-2 flex gap-2'>
                    <Link
                      href={`/admin/projects/${p.projectId}/edit`}
                      className='text-blue-500 hover:underline'
                    >
                      수정
                    </Link>
                    <DeleteProjectButton projectId={p.projectId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
