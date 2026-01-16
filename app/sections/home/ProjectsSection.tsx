'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/services/projectService';

const baseStyle = 'relative font-extrabold cursor-pointer';
const underlineBase = `after:absolute after:left-0 after:-bottom-1 
  after:h-[3px] after:w-full 
  after:bg-black 
  after:content-[""] 
  after:transform after:scale-x-0 
  after:origin-center 
  after:transition-transform 
  after:duration-300 after:ease-out`;
const activeStyle = 'after:scale-x-100';
const inactiveStyle = 'text-gray-500 hover:after:scale-x-100';

type Props = {
  id: string;
  data: Project[];
};

export default function ProjectsSection({ id, data }: Props) {
  const [isFocus, setIsFocus] = useState('work');
  const workProjectList = data.filter((item) => item.type === 'work');
  const personalProjectList = data.filter((item) => item.type === 'personal');
  const dataLength = data && data.length;

  // TODO 1 : 마지막줄 카드의 경우 border가 보이지 않도록

  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 tb:px-4 tb:pt-8 tb:pb-10 pc:px-8 pc:pt-9 pc:pb-12'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>Projects</h2>
      <header className='flex flex-row gap-4 mt-5'>
        <h3
          className={`${baseStyle} ${underlineBase} ${
            isFocus === 'work' ? activeStyle : inactiveStyle
          }`}
          onClick={() => setIsFocus('work')}
        >
          실무 프로젝트
        </h3>
        <h3
          className={`${baseStyle} ${underlineBase} ${
            isFocus === 'personal' ? activeStyle : inactiveStyle
          }`}
          onClick={() => setIsFocus('personal')}
        >
          개인 프로젝트
        </h3>
      </header>
      <div className='grid tb:grid-cols-2 pc:grid-cols-3 gap-6 mt-3'>
        {isFocus === 'work'
          ? workProjectList.map((item) => (
              <ProjectCard key={item.projectId} data={item} />
            ))
          : personalProjectList.map((item) => (
              <ProjectCard key={item.projectId} data={item} />
            ))}
      </div>
    </section>
  );
}
