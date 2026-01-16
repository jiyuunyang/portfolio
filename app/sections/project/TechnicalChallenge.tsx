import { ProjectDetail } from '@/lib/services/projectService';

type Props = {
  id: string;
  data: ProjectDetail['technicalChallenge'];
};

export default function TechnicalChallenge({ id, data }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-gray-950 border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>기술적 고민</h2>
      <div className='h-3' />
      <ul>
        {data?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
