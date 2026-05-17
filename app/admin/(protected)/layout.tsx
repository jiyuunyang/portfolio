import { getAdminSession } from '@/lib/adminSession';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminLogoutButton from './AdminLogoutButton';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900'>
      <header className='flex items-center justify-between border-b border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800'>
        <div className='flex items-center gap-4'>
          <Link href='/admin' className='font-bold'>
            관리자
          </Link>
          <nav className='flex gap-3 text-sm'>
            <Link href='/admin/projects' className='hover:underline'>
              프로젝트
            </Link>
            <Link href='/admin/experience' className='hover:underline'>
              경력
            </Link>
            <Link href='/' className='hover:underline text-gray-500'>
              사이트 보기
            </Link>
          </nav>
        </div>
        <div className='flex items-center gap-3 text-sm'>
          <span className='text-gray-500 hidden tb:inline'>
            {session.email}
          </span>
          <AdminLogoutButton />
        </div>
      </header>
      <main className='flex-1 p-4 tb:p-6 max-w-5xl w-full mx-auto'>
        {children}
      </main>
    </div>
  );
}
