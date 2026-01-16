'use client';
import { Profile } from '@/lib/services/profileService';
import Link from 'next/link';

type Props = {
  id: string;
  data: Profile['about'];
};

export default function About({ data, id }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-gray-950 border-b 
      flex flex-col gap-3'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>About</h2>
      <p>{data}</p>
      <Link className='text-sm text-gray-500' href='#projects'>
        👉 프로젝트 보러가기
      </Link>
    </section>
  );
}
