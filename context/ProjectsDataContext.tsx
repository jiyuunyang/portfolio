'use client';

import { Project } from '@/lib/services/projectService';
import { createContext, useContext, ReactNode, useState } from 'react';

interface ProjectsDataContextType {
  projects: Project[];
}

const ProjectsDataContext = createContext<ProjectsDataContextType>({
  projects: [],
});

interface Props {
  initialData: Project[]; // 서버에서 fetch한 프로젝트 데이터를 props로 전달
  children: ReactNode;
}

export function ProjectsDataProvider({ initialData, children }: Props) {
  const [projects] = useState<Project[]>(initialData);

  return (
    <ProjectsDataContext.Provider value={{ projects }}>
      {children}
    </ProjectsDataContext.Provider>
  );
}

// Hook으로 쉽게 사용
export function useProjectsData() {
  return useContext(ProjectsDataContext);
}
