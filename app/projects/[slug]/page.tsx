import BackToMain from '@/app/sections/project/BackToMain';
import FeaturesSection from '@/app/sections/project/FeaturesSection';
import Outline from '@/app/sections/project/Outline';
import Result from '@/app/sections/project/Result';
import Retrospect from '@/app/sections/project/Retrospect';
import Role from '@/app/sections/project/Role';
import Summary from '@/app/sections/project/Summary';
import TechnicalChallenge from '@/app/sections/project/TechnicalChallenge';

export default function ProjectDetail() {
  return (
    <div>
      <div className='tb:grid tb:grid-cols-2'>
        <Summary />
        <div>
          <Outline />
          <Role />
        </div>
      </div>
      <FeaturesSection />
      <TechnicalChallenge />
      <Result />
      <Retrospect />
      <BackToMain />
    </div>
  );
}
