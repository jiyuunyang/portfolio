import { ProjectDetail } from '@/lib/services/projectService';

type Props = {
  id: string;
  data: ProjectDetail;
};

export default function Outline({ id, data }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>프로젝트 개요</h2>
      <div className='h-3' />
      <ul className='pl-5 list-disc'>
        <li>기간: {data.period}</li>
        <li>소속: {data.company}</li>
        <li>역할: {data.mainRole}</li>
        <li>플랫폼: {data.platform}</li>
        <li>기술 스택: {data.stacks}</li>
      </ul>
      <div className='h-3' />
      <p>{data.context}</p>
    </section>
  );
}
