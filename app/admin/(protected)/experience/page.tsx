import Link from 'next/link';
import { getAllExperienceInputs } from '@/lib/services/experienceService';
import DeleteExperienceButton from './DeleteExperienceButton';

export const dynamic = 'force-dynamic';

export default async function AdminExperiencePage() {
  const experiences = await getAllExperienceInputs();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>경력</h1>
        <Link
          href='/admin/experience/new'
          className='bg-gray-900 text-white px-3 py-2 rounded text-sm hover:opacity-80 dark:bg-gray-100 dark:text-gray-900'
        >
          + 새 경력
        </Link>
      </div>

      {experiences.length === 0 ? (
        <p className='text-gray-500'>등록된 경력이 없습니다.</p>
      ) : (
        <div className='border rounded-lg overflow-hidden bg-white dark:bg-gray-800'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-100 dark:bg-gray-700 text-left'>
              <tr>
                <th className='px-3 py-2'>순서</th>
                <th className='px-3 py-2'>ID</th>
                <th className='px-3 py-2'>회사</th>
                <th className='px-3 py-2'>역할</th>
                <th className='px-3 py-2'>기간</th>
                <th className='px-3 py-2 w-32'>관리</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((e) => (
                <tr
                  key={e.id}
                  className='border-t border-gray-200 dark:border-gray-700'
                >
                  <td className='px-3 py-2'>{e.order}</td>
                  <td className='px-3 py-2 font-mono text-xs'>{e.id}</td>
                  <td className='px-3 py-2 font-medium'>{e.company}</td>
                  <td className='px-3 py-2'>{e.role}</td>
                  <td className='px-3 py-2'>
                    {e.timeStart} – {e.timeEnd}
                  </td>
                  <td className='px-3 py-2 flex gap-2'>
                    <Link
                      href={`/admin/experience/${e.id}/edit`}
                      className='text-blue-500 hover:underline'
                    >
                      수정
                    </Link>
                    <DeleteExperienceButton id={e.id} />
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
