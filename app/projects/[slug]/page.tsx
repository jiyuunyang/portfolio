import BackToMain from '@/app/sections/project/BackToMain';
import FeaturesSection from '@/app/sections/project/FeaturesSection';
import Outline from '@/app/sections/project/Outline';
import Result from '@/app/sections/project/Result';
import Role from '@/app/sections/project/Role';
import Summary from '@/app/sections/project/Summary';
import TechnicalChallenge from '@/app/sections/project/TechnicalChallenge';
import { getProjectDetail } from '@/lib/services/projectService';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'no-store'

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const projectDetail = await getProjectDetail(slug);
  return (
    <div>
      <div className='tb:grid tb:grid-cols-2'>
        {projectDetail && <Summary id='summary' data={projectDetail} />}
        <div className='tb:flex tb:flex-col tb:justify-end'>
          {projectDetail && <Outline id='outline' data={projectDetail} />}
          {projectDetail?.roles && (
            <Role id='role' data={projectDetail.roles} />
          )}
        </div>
      </div>
      {projectDetail?.features && (
        <FeaturesSection id='features' data={projectDetail.features} />
      )}
      {projectDetail?.technicalChallenge && (
        <TechnicalChallenge
          id='technical-challenge'
          data={projectDetail.technicalChallenge}
        />
      )}
      {projectDetail?.result && (
        <Result id='result' data={projectDetail.result} />
      )}
      <BackToMain />
    </div>
  );
}
