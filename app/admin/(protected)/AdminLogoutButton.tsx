'use client';

import { clientAuth } from '@/lib/firebaseClient';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await fetch('/api/admin/session', { method: 'DELETE' });
      await signOut(clientAuth).catch(() => {});
      router.replace('/admin/login');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className='border rounded px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50'
    >
      {loading ? '...' : '로그아웃'}
    </button>
  );
}
