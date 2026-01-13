import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <main className='pt-12 pc:pl-52 pc:pt-0'>{children}</main>;
}
