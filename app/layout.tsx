import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import MainLayout from './components/MainLayout';

const notoSans = Noto_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-noto-sans',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: `Jiyun's portfolio`,
  description: '개발자로서의 비전, 기술 스택, 프로젝트 및 이력이 담겼습니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${notoSansKr.variable} ${notoSans.variable} antialiased`}
      >
        <Navigation />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
