'use client';

import { ExperienceInput } from '@/lib/services/experienceService';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import {
  createExperienceAction,
  updateExperienceAction,
} from './actions';

type Props = {
  mode: 'create' | 'edit';
  initialId?: string;
  initialValues: ExperienceInput;
};

const inputCls = 'w-full border rounded px-3 py-2 bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700';

export default function ExperienceForm({
  mode,
  initialId,
  initialValues,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [id, setId] = useState(initialId ?? '');
  const [v, setV] = useState<ExperienceInput>(initialValues);

  function patch<K extends keyof ExperienceInput>(
    key: K,
    value: ExperienceInput[K],
  ) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function updateTask(idx: number, value: string) {
    const next = [...v.tasks];
    next[idx] = value;
    patch('tasks', next);
  }
  function addTask() {
    patch('tasks', [...v.tasks, '']);
  }
  function removeTask(idx: number) {
    patch(
      'tasks',
      v.tasks.filter((_, i) => i !== idx),
    );
  }
  function moveTask(idx: number, dir: -1 | 1) {
    const t = idx + dir;
    if (t < 0 || t >= v.tasks.length) return;
    const next = [...v.tasks];
    [next[idx], next[t]] = [next[t], next[idx]];
    patch('tasks', next);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createExperienceAction(id, v)
          : await updateExperienceAction(initialId!, v);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push('/admin/experience');
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <section className='border rounded-lg bg-white dark:bg-gray-800 p-4 flex flex-col gap-4'>
        <label className='flex flex-col gap-1 text-sm'>
          <span className='text-gray-600 dark:text-gray-300'>
            ID (Firestore 문서 ID)
          </span>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={mode === 'edit'}
            required
            placeholder='예: databi'
            className={inputCls}
          />
        </label>

        <div className='flex flex-col tb:flex-row gap-3'>
          <label className='flex flex-col gap-1 text-sm flex-1'>
            <span className='text-gray-600 dark:text-gray-300'>회사</span>
            <input
              value={v.company}
              onChange={(e) => patch('company', e.target.value)}
              required
              className={inputCls}
            />
          </label>
          <label className='flex flex-col gap-1 text-sm flex-1'>
            <span className='text-gray-600 dark:text-gray-300'>역할</span>
            <input
              value={v.role}
              onChange={(e) => patch('role', e.target.value)}
              required
              className={inputCls}
            />
          </label>
        </div>

        <div className='flex flex-col tb:flex-row gap-3'>
          <label className='flex flex-col gap-1 text-sm flex-1'>
            <span className='text-gray-600 dark:text-gray-300'>
              시작 (YYYY-MM)
            </span>
            <input
              type='month'
              value={v.timeStart}
              onChange={(e) => patch('timeStart', e.target.value)}
              required
              className={inputCls}
            />
          </label>
          <label className='flex flex-col gap-1 text-sm flex-1'>
            <span className='text-gray-600 dark:text-gray-300'>
              종료 (YYYY-MM)
            </span>
            <input
              type='month'
              value={v.timeEnd}
              onChange={(e) => patch('timeEnd', e.target.value)}
              required
              className={inputCls}
            />
          </label>
          <label className='flex flex-col gap-1 text-sm w-32'>
            <span className='text-gray-600 dark:text-gray-300'>순서</span>
            <input
              type='number'
              value={v.order}
              onChange={(e) => patch('order', Number(e.target.value))}
              required
              className={inputCls}
            />
          </label>
        </div>
      </section>

      <section className='border rounded-lg bg-white dark:bg-gray-800 p-4 flex flex-col gap-4'>
        <h2 className='font-semibold'>업무 (tasks)</h2>
        <div className='flex flex-col gap-2'>
          {v.tasks.map((task, idx) => (
            <div key={idx} className='flex gap-2'>
              <span className='text-xs text-gray-400 w-6 pt-2'>{idx + 1}</span>
              <input
                value={task}
                onChange={(e) => updateTask(idx, e.target.value)}
                placeholder='업무 한 줄'
                className={inputCls}
              />
              <div className='flex gap-1'>
                <button
                  type='button'
                  onClick={() => moveTask(idx, -1)}
                  className='border px-2 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  ↑
                </button>
                <button
                  type='button'
                  onClick={() => moveTask(idx, 1)}
                  className='border px-2 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  ↓
                </button>
                <button
                  type='button'
                  onClick={() => removeTask(idx)}
                  className='border border-red-300 text-red-500 px-2 rounded text-xs hover:bg-red-50 dark:hover:bg-red-900/20'
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <button
            type='button'
            onClick={addTask}
            className='self-start text-sm text-blue-500 hover:underline'
          >
            + 업무 추가
          </button>
        </div>
      </section>

      {error && (
        <p className='text-red-500 text-sm border border-red-300 rounded p-2'>
          {error}
        </p>
      )}

      <div className='flex gap-3 pt-4 border-t'>
        <button
          type='submit'
          disabled={pending}
          className='bg-gray-900 text-white px-4 py-2 rounded hover:opacity-80 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900'
        >
          {pending ? '저장 중...' : mode === 'create' ? '생성' : '저장'}
        </button>
        <button
          type='button'
          onClick={() => router.push('/admin/experience')}
          className='border px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'
        >
          취소
        </button>
      </div>
    </form>
  );
}
