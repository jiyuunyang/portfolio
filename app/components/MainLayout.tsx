'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) {
    // /admin 라우트는 자체 레이아웃을 사용하므로 사이트 네비 패딩을 제거
    return <main>{children}</main>;
  }
  return <main className='pt-12 pc:pl-52 pc:pt-0'>{children}</main>;
}
