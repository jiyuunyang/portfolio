import { Experience } from '@/lib/services/experienceService';
import ExperienceCard from './ExperienceCard';

type Props = {
  id: string;
  data: Experience[];
};

export default function ExperienceSection({ id, data }: Props) {
  return (
    <section
      id={id}
      className='px-7 pt-4 pb-6 
      tb:px-9 tb:pt-8 tb:pb-10 
      pc:px-13 pc:pt-9 pc:pb-12 
      bg-gray-800'
    >
      <h2 className='text-xl tb:text-2xl font-bold text-amber-100'>
        Experience
      </h2>
      {data.map((item, idx) => (
        <ExperienceCard
          key={item.id}
          data={item}
          noBorderBottom={idx === data.length - 1}
        />
      ))}
    </section>
  );
}
