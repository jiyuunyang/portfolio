'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
const activateStyle =
  'border-b-3 font-extrabold hover:opacity-80 cursor-pointer';
const nonActivateStlye =
  'text-gray-500 font-extrabold hover:text-gray-700 cursor-pointer';

export default function ProjectsSection() {
  const [isFocus, setIsFocus] = useState(0);

  // TODO 1 : 마지막줄 카드의 경우 border가 보이지 않도록
  // TODO 2 : 탭 클릭시 밑줄이 자연스럽게 나오도록

  return (
    <section
      id='projects'
      className='mx-5 px-2 pt-4 pb-6 tb:px-4 tb:pt-8 tb:pb-10 pc:px-8 pc:pt-9 pc:pb-12'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>Projects</h2>
      <header className='flex flex-row gap-4 mt-5'>
        <h3
          className={isFocus == 0 ? activateStyle : nonActivateStlye}
          onClick={() => setIsFocus(0)}
        >
          실무 프로젝트
        </h3>
        <h3
          className={isFocus == 1 ? activateStyle : nonActivateStlye}
          onClick={() => setIsFocus(1)}
        >
          개인 프로젝트
        </h3>
      </header>
      <div className='grid tb:grid-cols-2 pc:grid-cols-3 gap-6 mt-3'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard noBorderBottom />
      </div>
    </section>
  );
}
