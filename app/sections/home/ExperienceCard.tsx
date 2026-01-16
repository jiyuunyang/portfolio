import { format } from 'date-fns';
import { Experience } from '@/lib/services/experienceService';

type ExperienceCardProps = {
  noBorderBottom?: boolean;
  data: Experience;
};

export default function ExperienceCard({
  noBorderBottom = false,
  data,
}: ExperienceCardProps) {
  const startDate = format(data.timeStart.toDate(), 'yyyy-MM');
  const endDate = format(data.timeEnd.toDate(), 'yyy-MM');

  return (
    <article
      className={`py-6 max-w-5xl ${
        noBorderBottom ? '' : 'border-b border-amber-100'
      }`}
    >
      <header className='flex flex-row gap-2'>
        <h3 className='text-gray-50 text-lg font-semibold'>
          {data.company} | {data.role}
        </h3>
        <time dateTime={`${startDate}/${endDate}`} className='text-gray-50'>
          {`(${startDate} - ${endDate})`}
        </time>
      </header>
      <ul className='pl-5 list-disc text-gray-50'>
        {data.tasks.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
