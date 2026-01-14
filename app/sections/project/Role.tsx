export default function Role() {
  return (
    <section
      id='role'
      className='mx-5 px-2 pt-4 pb-6 tb:px-4 tb:pt-8 tb:pb-10 pc:px-8 pc:pt-9 pc:pb-12 border-gray-950 border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>담당 역할</h2>
      <div className='h-3' />
      <ul className='pl-5 list-disc'>
        <li>테이블오더 기기 전용 앱 프론트엔드 개발</li>
        <li>기기 관리 및 주문·결제 플로우 UX 구현</li>
        <li>실매장 테스트를 기반으로 한 기능 개선 및 오류 대응</li>
      </ul>
    </section>
  );
}
