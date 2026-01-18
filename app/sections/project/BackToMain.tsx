'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BackToMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'primary';
  return (
    <div className='p-10 flex flex-row justify-center'>
      <button
        className='w-40 flex flex-row items-center gap-3 hover:opacity-80 cursor-pointer'
        onClick={() => router.replace(`/?tab=${tab}`, { scroll: false })}
      >
        <ArrowLeft size={24} />
        <span className='text-xl font-bold'>메인으로</span>
      </button>
    </div>
  );
}
