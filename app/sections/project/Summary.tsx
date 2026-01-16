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
      border-b 
      flex flex-col justify-end gap-5'
    >
      <h1 className='text-2xl tb:text-3xl font-bold'>{data.title}</h1>
      <Image
        src={data.summaryImage}
        alt='image_desc'
        width={400} // 원본 이미지 가로
        height={133} // 원본 이미지 세로
        sizes='(max-width: 700px) 100vw, 400px'
        className='w-full h-auto 
        max-h-[300px] tb:max-h-[400px] 
        object-contain
        bg-gray-100
        '
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
