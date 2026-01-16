import { Profile } from '@/lib/services/profileService';

type Props = {
  id: string;
  data: Profile['skills'];
};

export default function Skills({ id, data }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-b 
      flex flex-col gap-3'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>Skills</h2>
      <ul className='pl-5 list-disc'>
        {data && data.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </section>
  );
}
