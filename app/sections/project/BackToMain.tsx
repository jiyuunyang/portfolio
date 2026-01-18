'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackToMain() {
  return (
    <div className='p-10 flex flex-row justify-center'>
      <Link
        className='w-40 flex flex-row items-center gap-3 hover:opacity-80 cursor-pointer'
        href='/'
      >
        <ArrowLeft size={24} />
        <span className='text-xl font-bold'>메인으로</span>
      </Link>
    </div>
  );
}
