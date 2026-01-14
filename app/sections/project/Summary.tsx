import Image from 'next/image';

export default function Summary() {
  return (
    <section
      id='summary'
      className='mx-5 px-2 py-6 tb:px-4 tb:py-10 pc:px-8 pc:py-12 border-gray-950 border-b flex flex-col gap-5'
    >
      <h1 className='text-2xl tb:text-3xl font-bold'>먼키 테이블오더 앱</h1>
      <Image
        src='/photos/project_photo.png'
        alt='image_desc'
        width={400}
        height={133}
        sizes='(max-width: 700px) 300px, 400px'
        className='w-full max-w-[300px] tb:max-w-[400px] h-auto'
      />
      <p>
        매장 내 테이블오더 기기를 통해 주문·결제를 진행하는 앱으로, 실제 매장
        환경과 기기 제약을 고려해 안정성과 사용성을 중심으로 개발했습니다.
      </p>
    </section>
  );
}
