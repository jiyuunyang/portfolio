export default function FeatureCard() {
  return (
    <article className='pb-3'>
      <h3 className='font-bold'>테이블오더 기기 관리 기능</h3>
      <ul className='pl-5 list-disc'>
        <li>
          홈 런처 히든 영역 클릭 시 기기 시리얼 넘버 바코드 노출 기능 구현
        </li>
        <li>
          시리얼 넘버 스캔을 통해 기기 재고 상태를 관리하는 안드로이드 앱 개발
        </li>
        <li>
          매장 및 내부 운영팀에서 기기를 쉽게 식별·관리할 수 있도록 UX 설계
        </li>
      </ul>
    </article>
  );
}
