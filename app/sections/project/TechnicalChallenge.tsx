type Props = {
  id: string;
};

export default function TechnicalChallenge({ id }: Props) {
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
        <li>⚡ 안정성: 주문 상태 로컬 캐싱</li>
        <li>📡 환경 대응: 네트워크 오류 UI 분기</li>
        <li>🧭 UX: 실패 원인 명확화</li>
      </ul>
    </section>
  );
}
