'use client';

import { useRouter } from 'next/navigation';

type ProjectsCardProps = {
  noBorderBottom?: boolean;
};

export default function ProjectsCard({
  noBorderBottom = false,
}: ProjectsCardProps) {
  const router = useRouter();

  return (
    <article
      className={`py-3 ${noBorderBottom ? '' : 'border-b border-gray-300'}`}
      onClick={() => router.push('/projects/1')}
    >
      <header className='flex items-end'>
        <h4 className='text-lg font-semibold'>먼키 테이블오더 앱</h4>
        <div className='w-2' />
        <aside className='text-sm  text-gray-500'>👉 자세히 보기</aside>
      </header>
      <div className='h-3' />
      <p>
        매장 내 태블릿 환경에서 주문과 결제를 안정적으로 처리하는 테이블오더 앱
        개발
      </p>
      <ul className='pl-5 list-disc'>
        <li>Flutter 기반 실서비스 운영</li>
        <li>기기 제약 및 네트워크 오류 상황을 고려한 UX 개선</li>
      </ul>
    </article>
  );
}
