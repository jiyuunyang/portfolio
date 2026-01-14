'use client';
import Link from 'next/link';

export default function About() {
  return (
    <section
      id='about'
      className='mx-5 px-2 pt-4 pb-6 tb:px-4 tb:pt-8 tb:pb-10 pc:px-8 pc:pt-9 pc:pb-12 border-gray-950 border-b flex flex-col gap-3'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>About</h2>
      <p>
        사람이 실제로 사용하는 환경을 고려해 서비스를 만드는 프론트엔드
        개발자입니다. <br />
        주문·결제·운영 도메인의 웹과 앱을 개발해왔으며, 빠른 구현과 이후 유지
        보수를 함께 고민합니다.
      </p>
      <Link className='text-sm text-gray-500' href='#projects'>
        👉 프로젝트 보러가기
      </Link>
    </section>
  );
}
