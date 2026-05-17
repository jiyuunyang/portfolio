'use client';

import { ProjectInput } from '@/lib/services/projectService';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { createProjectAction, updateProjectAction } from './actions';

type Mode = 'create' | 'edit';

type Props = {
  mode: Mode;
  initialId?: string;
  initialValues: ProjectInput;
};

const TYPE_OPTIONS: ProjectInput['type'][] = ['primary', 'work', 'personal'];

export default function ProjectForm({ mode, initialId, initialValues }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [projectId, setProjectId] = useState(initialId ?? '');
  const [v, setV] = useState<ProjectInput>(initialValues);

  function patch<K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createProjectAction(projectId, v)
          : await updateProjectAction(initialId!, v);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push('/admin/projects');
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-6'>
      {/* 기본 정보 */}
      <Section title='기본 정보'>
        <Field label='프로젝트 ID (Firestore 문서 ID, URL slug)'>
          <input
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            disabled={mode === 'edit'}
            required
            placeholder='예: monthly-kitchen'
            className={inputCls}
          />
        </Field>

        <Row>
          <Field label='제목'>
            <input
              value={v.title}
              onChange={(e) => patch('title', e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label='순서 (오름차순)'>
            <input
              type='number'
              value={v.order}
              onChange={(e) => patch('order', Number(e.target.value))}
              required
              className={inputCls}
            />
          </Field>
        </Row>

        <Row>
          <Field label='타입'>
            <select
              value={v.type}
              onChange={(e) =>
                patch('type', e.target.value as ProjectInput['type'])
              }
              className={inputCls}
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label='관련 링크 (선택)'>
            <input
              value={v.link ?? ''}
              onChange={(e) => patch('link', e.target.value)}
              placeholder='https://...'
              className={inputCls}
            />
          </Field>
        </Row>
      </Section>

      {/* 요약 / 카드 */}
      <Section title='요약 (목록 카드 + 상세 상단)'>
        <Field label='요약 이미지 URL'>
          <input
            value={v.summaryImage}
            onChange={(e) => patch('summaryImage', e.target.value)}
            placeholder='https://...'
            className={inputCls}
          />
        </Field>
        <Field label='요약 설명'>
          <textarea
            value={v.summaryDesc}
            onChange={(e) => patch('summaryDesc', e.target.value)}
            rows={3}
            className={inputCls}
          />
        </Field>
        <Field label='기술 스택 (카드/상세 공용)'>
          <input
            value={v.stacks}
            onChange={(e) => patch('stacks', e.target.value)}
            placeholder='예: Dart, Flutter, Firebase'
            className={inputCls}
          />
        </Field>
        <Field label='카드 핵심 기능 (메인 페이지 카드에 노출)'>
          <StringList
            value={v.cardFeatures}
            onChange={(next) => patch('cardFeatures', next)}
            placeholder='예: 테이블 주문 처리'
          />
        </Field>
      </Section>

      {/* 상세 정보 (Outline) */}
      <Section title='프로젝트 개요'>
        <Row>
          <Field label='기간'>
            <input
              value={v.period}
              onChange={(e) => patch('period', e.target.value)}
              placeholder='2024.01 – 2024.09'
              className={inputCls}
            />
          </Field>
          <Field label='소속'>
            <input
              value={v.company}
              onChange={(e) => patch('company', e.target.value)}
              className={inputCls}
            />
          </Field>
        </Row>
        <Row>
          <Field label='역할'>
            <input
              value={v.mainRole}
              onChange={(e) => patch('mainRole', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label='플랫폼'>
            <input
              value={v.platform}
              onChange={(e) => patch('platform', e.target.value)}
              placeholder='예: Android (Table Order Device)'
              className={inputCls}
            />
          </Field>
        </Row>
        <Field label='배경/맥락 (context)'>
          <textarea
            value={v.context}
            onChange={(e) => patch('context', e.target.value)}
            rows={4}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* 담당 역할 */}
      <Section title='담당 역할'>
        <StringList
          value={v.roles}
          onChange={(next) => patch('roles', next)}
          placeholder='역할 한 줄'
        />
      </Section>

      {/* 주요 구현 내용 */}
      <Section title='주요 구현 내용'>
        <FeaturesEditor
          value={v.features}
          onChange={(next) => patch('features', next)}
        />
      </Section>

      {/* 기술적 고민 */}
      <Section title='기술적 고민 (선택)'>
        <StringList
          value={v.technicalChallenge ?? []}
          onChange={(next) => patch('technicalChallenge', next)}
          placeholder='기술적 고민/결정 한 줄'
        />
      </Section>

      {/* 성과 및 회고 */}
      <Section title='성과 및 회고'>
        <StringList
          value={v.result}
          onChange={(next) => patch('result', next)}
          placeholder='성과 한 줄'
        />
      </Section>

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
          onClick={() => router.push('/admin/projects')}
          className='border px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'
        >
          취소
        </button>
      </div>
    </form>
  );
}

const inputCls =
  'w-full border rounded px-3 py-2 bg-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='border rounded-lg bg-white dark:bg-gray-800 p-4 flex flex-col gap-4'>
      <h2 className='font-semibold'>{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className='flex flex-col gap-1 text-sm flex-1'>
      <span className='text-gray-600 dark:text-gray-300'>{label}</span>
      {children}
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col tb:flex-row gap-3'>{children}</div>;
}

function StringList({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  function update(idx: number, v: string) {
    const next = [...value];
    next[idx] = v;
    onChange(next);
  }
  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function add() {
    onChange([...value, '']);
  }
  function move(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  return (
    <div className='flex flex-col gap-2'>
      {value.map((item, idx) => (
        <div key={idx} className='flex gap-2'>
          <span className='text-xs text-gray-400 w-6 pt-2'>{idx + 1}</span>
          <input
            value={item}
            onChange={(e) => update(idx, e.target.value)}
            placeholder={placeholder}
            className={inputCls}
          />
          <ListButtons
            onUp={() => move(idx, -1)}
            onDown={() => move(idx, 1)}
            onRemove={() => remove(idx)}
          />
        </div>
      ))}
      <button
        type='button'
        onClick={add}
        className='self-start text-sm text-blue-500 hover:underline'
      >
        + 항목 추가
      </button>
    </div>
  );
}

function ListButtons({
  onUp,
  onDown,
  onRemove,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className='flex gap-1'>
      <button
        type='button'
        onClick={onUp}
        className='border px-2 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700'
        aria-label='위로'
      >
        ↑
      </button>
      <button
        type='button'
        onClick={onDown}
        className='border px-2 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700'
        aria-label='아래로'
      >
        ↓
      </button>
      <button
        type='button'
        onClick={onRemove}
        className='border border-red-300 text-red-500 px-2 rounded text-xs hover:bg-red-50 dark:hover:bg-red-900/20'
        aria-label='삭제'
      >
        ×
      </button>
    </div>
  );
}

function FeaturesEditor({
  value,
  onChange,
}: {
  value: { title: string; details: string[] }[];
  onChange: (next: { title: string; details: string[] }[]) => void;
}) {
  function updateTitle(idx: number, title: string) {
    const next = [...value];
    next[idx] = { ...next[idx], title };
    onChange(next);
  }
  function updateDetails(idx: number, details: string[]) {
    const next = [...value];
    next[idx] = { ...next[idx], details };
    onChange(next);
  }
  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function add() {
    onChange([...value, { title: '', details: [] }]);
  }
  function move(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  return (
    <div className='flex flex-col gap-4'>
      {value.map((feat, idx) => (
        <div
          key={idx}
          className='border rounded p-3 flex flex-col gap-2 bg-gray-50 dark:bg-gray-900'
        >
          <div className='flex gap-2 items-start'>
            <span className='text-xs text-gray-400 w-6 pt-2'>{idx + 1}</span>
            <input
              value={feat.title}
              onChange={(e) => updateTitle(idx, e.target.value)}
              placeholder='기능 제목'
              className={inputCls}
            />
            <ListButtons
              onUp={() => move(idx, -1)}
              onDown={() => move(idx, 1)}
              onRemove={() => remove(idx)}
            />
          </div>
          <div className='pl-8'>
            <p className='text-xs text-gray-500 mb-1'>세부 내용</p>
            <StringList
              value={feat.details}
              onChange={(next) => updateDetails(idx, next)}
              placeholder='세부 내용 한 줄'
            />
          </div>
        </div>
      ))}
      <button
        type='button'
        onClick={add}
        className='self-start text-sm text-blue-500 hover:underline'
      >
        + 기능 추가
      </button>
    </div>
  );
}
