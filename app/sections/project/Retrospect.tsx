type Props = {
  id: string;
};

export default function Retrospect({ id }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-gray-950 border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>회고</h2>
      <div className='h-3' />
      <ul className='pl-5 list-disc'>
        <li>
          실제 사용 환경을 고려한 개발이 UX 품질에 가장 큰 영향을 준다는 점을
          체감
        </li>
        <li>
          단순 기능 구현보다, 오류 상황까지 포함한 사용자 흐름 설계의 중요성을
          경험
        </li>
        <li>
          운영 도메인을 이해하는 프론트엔드 개발자의 역할에 대해 명확히 인식하게
          됨
        </li>
      </ul>
    </section>
  );
}
