'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BackToMain() {
  const router = useRouter();
  return (
    <div className='p-10 flex flex-row justify-center'>
      <button
        className='w-40 flex flex-row items-center gap-3 hover:opacity-80 cursor-pointer'
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} />
        <Link className='text-xl font-bold' href='/'>
          메인으로
        </Link>
      </button>
    </div>
  );
}
