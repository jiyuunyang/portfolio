'use client';

import { clientAuth } from '@/lib/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(
        clientAuth,
        email,
        password,
      );
      const idToken = await cred.user.getIdToken();
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? '로그인에 실패했습니다.');
      }
      const redirect = params.get('redirect') || '/admin';
      router.replace(redirect);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4'>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4'
      >
        <h1 className='text-xl font-bold'>관리자 로그인</h1>

        <label className='flex flex-col gap-1 text-sm'>
          이메일
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border rounded px-3 py-2 bg-transparent'
            autoComplete='email'
          />
        </label>

        <label className='flex flex-col gap-1 text-sm'>
          비밀번호
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border rounded px-3 py-2 bg-transparent'
            autoComplete='current-password'
          />
        </label>

        {error && <p className='text-sm text-red-500'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='bg-gray-900 text-white rounded py-2 hover:opacity-80 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900'
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </main>
  );
}
