'use client';

import { Project } from '@/lib/services/projectService';
import { useRouter } from 'next/navigation';

type ProjectCardProps = {
  noBorderBottom?: boolean;
  data: Project;
};

export default function ProjectCard({
  noBorderBottom = false,
  data,
}: ProjectCardProps) {
  const router = useRouter();

  return (
    <article
      className={`py-3 cursor-pointer hover:bg-gray-50 transition ${
        noBorderBottom ? '' : 'border-b border-gray-300'
      }`}
      onClick={() => router.push(`/projects/${data.projectId}`)}
    >
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
    </article>
  );
}
