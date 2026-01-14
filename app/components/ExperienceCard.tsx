type ExperienceCardProps = {
  noBorderBottom?: boolean;
};

export default function ExperienceCard({
  noBorderBottom = false,
}: ExperienceCardProps) {
  return (
    <article
      className={`py-6 max-w-5xl ${
        noBorderBottom ? '' : 'border-b border-gray-300'
      }`}
    >
      <header className='flex flex-row'>
        <h3 className='text-gray-50 text-lg font-semibold'>
          먼슬리키친 | 프론트엔드
        </h3>
        <div className='w-2' />
        <time dateTime='2023-08/2024-09' className='text-gray-50'>
          (2023.08 – 2024.09)
        </time>
      </header>
      <ul className='pl-5 list-disc text-gray-50'>
        <li>
          테이블오더, 키오스크, 모바일 주문 앱 등 매장 환경 중심 서비스 개발
        </li>
        <li>주문·결제 플로우 개선 및 기기 제약 환경 대응 UX 구현s</li>
      </ul>
    </article>
  );
}
