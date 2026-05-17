'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteExperienceAction } from './actions';

export default function DeleteExperienceButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!confirm(`정말 "${id}" 경력을 삭제할까요?`)) return;
    startTransition(async () => {
      const result = await deleteExperienceAction(id);
      if (!result.ok) {
        alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className='text-red-500 hover:underline disabled:opacity-50'
    >
      {pending ? '삭제 중...' : '삭제'}
    </button>
  );
}
