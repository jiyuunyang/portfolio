import { ProjectDetail } from '@/lib/services/projectService';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id: string;
  data: ProjectDetail;
};

export default function Summary({ id, data }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 py-6 
      tb:px-4 tb:py-10 
      pc:px-8 pc:py-12 
      border-gray-950 border-b 
      flex flex-col justify-end gap-5'
    >
      <h1 className='text-2xl tb:text-3xl font-bold'>{data.title}</h1>
      <Image
        src='/github-mark-white.svg'
        // TODO : 실제 이미지 파일로 불러오기
        // src={data.summaryImage}
        alt='image_desc'
        width={400}
        height={133}
        sizes='(max-width: 700px) 300px, 400px'
        className='w-full max-w-[300px] tb:max-w-[400px] h-auto'
      />
      <p>{data.summaryDesc}</p>
      {data.link && (
        <Link className='text-sm text-gray-500' href={data.link}>
          👉 관련 링크
        </Link>
      )}
    </section>
  );
}
