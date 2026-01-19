import { ProjectDetail } from '@/lib/services/projectServerService';
import FeatureCard from './FeatureCard';
type Props = {
  id: string;
  data: ProjectDetail['features'];
};

export default function FeaturesSection({ id, data }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>주요 구현 내용</h2>
      <div className='h-5' />
      {data.map((item, idx) => (
        <FeatureCard key={idx} data={item} />
      ))}
    </section>
  );
}
