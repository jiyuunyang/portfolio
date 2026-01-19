'use client';

import { Project } from '@/lib/services/projectService';

type ProjectCardProps = {
  data: Project;
};

export default function ProjectCard({ data }: ProjectCardProps) {
  return (
    <article className='pb-8'>
      <header className='flex items-end gap-2'>
        <h4 className='text-lg font-semibold'>{data.title}</h4>
        <aside className='text-sm  text-gray-500'>👉 자세히 보기</aside>
      </header>
      <p className='mt-3'>{data.summaryDesc}</p>
      <ul className='pl-5 list-disc'>
        {data.cardFeatures.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className='mt-3 text-gray-500'>🛠️ {data.stacks}</p>
    </article>
  );
}
