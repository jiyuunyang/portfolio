export default function Result() {
  return (
    <section
      id='result'
      className='mx-5 px-2 pt-4 pb-6 tb:px-4 tb:pt-8 tb:pb-10 pc:px-8 pc:pt-9 pc:pb-12 border-gray-950 border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>결과 및 성과</h2>
      <div className='h-3' />
      <ul className='pl-5 list-disc'>
        <li>실매장 적용 후 주문 누락 및 기기 관리 관련 문의 감소</li>
        <li>매장 직원이 기기 상태를 빠르게 확인할 수 있어 운영 효율 향상</li>
        <li>이후 키오스크, 모바일 앱 프로젝트에서도 동일한 UX 패턴 재사용</li>
      </ul>
    </section>
  );
}
