'use client';

import { useState } from 'react';
import ProjectsCard from './ProjectsCard';
const activateStyle = 'border-b-3 font-extrabold';
const nonActivateStlye = 'text-gray-500 font-extrabold';

export default function ProjectsSection() {
  const [isFocus, setIsFocus] = useState(0);
  return (
    <section className='mx-5 px-2 pt-4 pb-6 tb:px-4 tb:pt-8 tb:pb-10 pc:px-8 pc:pt-9 pc:pb-12'>
      <h2 className='text-xl tb:text-2xl font-bold'>Projects</h2>
      <div className='h-5' />
      <header className='flex flex-row'>
        <h3
          className={isFocus == 0 ? activateStyle : nonActivateStlye}
          onClick={() => setIsFocus(0)}
        >
          실무 프로젝트
        </h3>
        <div className='w-4' />
        <h3
          className={isFocus == 1 ? activateStyle : nonActivateStlye}
          onClick={() => setIsFocus(1)}
        >
          개인 프로젝트
        </h3>
      </header>
      <div className='h-3' />
      <div className='grid tb:grid-cols-2 pc:grid-cols-3 gap-6'>
        <ProjectsCard />
        <ProjectsCard />
        <ProjectsCard />
        <ProjectsCard noBorderBottom />
      </div>
    </section>
  );
}
