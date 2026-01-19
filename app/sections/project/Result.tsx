import { ProjectDetail } from '@/lib/services/projectServerService';

type Props = {
  id: string;
  data: ProjectDetail['result'];
};

export default function Result({ id, data }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>성과 및 회고</h2>
      <div className='h-3' />
      <ul className='pl-5 list-disc'>
        {data.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
