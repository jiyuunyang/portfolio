'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteProjectAction } from './actions';

export default function DeleteProjectButton({
  projectId,
}: {
  projectId: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!confirm(`정말 "${projectId}" 프로젝트를 삭제할까요?`)) return;
    startTransition(async () => {
      const result = await deleteProjectAction(projectId);
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
