'use client';

import { useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { useProjectsData } from '@/context/ProjectsDataContext';
import { Project } from '@/lib/services/projectService';

const baseStyle = 'relative font-extrabold cursor-pointer';
const underlineBase = `after:absolute after:left-0 after:-bottom-1 
  after:h-[3px] after:w-full 
  after:bg-black
  dark:after:bg-gray-300
  after:content-[""] 
  after:transform after:scale-x-0 
  after:origin-center 
  after:transition-transform 
  after:duration-300 after:ease-out`;
const activeStyle = 'after:scale-x-100';
const inactiveStyle = 'text-gray-500 hover:after:scale-x-100';

type Props = {
  id: string;
};

type TabType = 'primary' | 'work' | 'personal';

export default function ProjectsSection({ id }: Props) {
  const [selectedTab, setSelectedTab] = useState<TabType>('primary');
  const { projects: data } = useProjectsData();

  useEffect(() => {
    const saved = sessionStorage.getItem('lastProjectTab');
    if (saved) {
      setTimeout(() => {
        setSelectedTab((saved as TabType) || 'primary');
      }, 0);
    }
  }, []);

  const changeTab = (tab: TabType) => {
    setSelectedTab(tab);
    sessionStorage.setItem('lastProjectTab', tab);
  };

  const projectListByTab = useMemo<Record<TabType, Project[]>>(() => {
    return {
      primary: data.filter((item) => item.type === 'primary'),
      work: data.filter((item) => item.type === 'work'),
      personal: data.filter((item) => item.type === 'personal'),
    };
  }, [data]);

  const currentProjectList = projectListByTab[selectedTab];

  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 tb:px-4 tb:pt-8 tb:pb-10 pc:px-8 pc:pt-9 pc:pb-12'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>Projects</h2>
      <header className='flex flex-row gap-4 mt-5 mb-9'>
        <h3
          className={`${baseStyle} ${underlineBase} ${
            selectedTab === 'primary' ? activeStyle : inactiveStyle
          }`}
          onClick={() => changeTab('primary')}
        >
          주요 프로젝트
        </h3>
        <h3
          className={`${baseStyle} ${underlineBase} ${
            selectedTab === 'work' ? activeStyle : inactiveStyle
          }`}
          onClick={() => changeTab('work')}
        >
          실무 프로젝트
        </h3>
        <h3
          className={`${baseStyle} ${underlineBase} ${
            selectedTab === 'personal' ? activeStyle : inactiveStyle
          }`}
          onClick={() => changeTab('personal')}
        >
          개인 프로젝트
        </h3>
      </header>
      <div className='grid tb:grid-cols-2 pc:grid-cols-3 gap-6 mt-3'>
        {currentProjectList.map((item) => (
          <Link
            key={item.projectId}
            href={`/projects/${item.projectId}`}
            className='flex flex-col cursor-pointer
          hover:bg-amber-50 transition
          dark:hover:bg-gray-700'
          >
            <ProjectCard data={item} />
            <div className='mt-auto h-px bg-gray-300' />
          </Link>
        ))}
      </div>
    </section>
  );
}
