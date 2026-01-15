type Props = {
  id: string;
};

export default function Outline({ id }: Props) {
  return (
    <section
      id={id}
      className='mx-5 px-2 pt-4 pb-6 
      tb:px-4 tb:pt-8 tb:pb-10 
      pc:px-8 pc:pt-9 pc:pb-12 
      border-gray-950 border-b'
    >
      <h2 className='text-xl tb:text-2xl font-bold'>프로젝트 개요</h2>
      <div className='h-3' />
      <ul className='pl-5 list-disc'>
        <li>기간: 2024.01 – 2024.09</li>
        <li>소속: 먼슬리키친</li>
        <li>역할: 프론트엔드 개발</li>
        <li>플랫폼: Android (Table Order Device)</li>
        <li>기술 스택: Dart, Flutter</li>
      </ul>
      <div className='h-3' />
      <p>
        기존 테이블오더 서비스는 매장 환경(와이파이 불안정, 기기 관리, 다중 주문
        상황)에서 다양한 오류 상황이 발생하고 있었고, 주문·결제 흐름이 끊기지
        않도록 안정적인 UX 개선이 필요했습니다. 특히 매장 직원이 기기를 직접
        관리해야 하는 상황이 많아, 기기 식별·관리 기능과 오류 대응 UX가 중요한
        요구사항이었습니다.
      </p>
    </section>
  );
}
