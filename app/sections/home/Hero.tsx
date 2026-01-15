export default function Hero() {
  return (
    <section
      className='mx-5 px-2 py-6 
    tb:px-4 tb:py-10 
    pc:px-8 pc:py-12 b
    order-gray-950 border-b 
    flex flex-col gap-3'
    >
      <h1 className='text-xl tb:text-2xl font-bold'>
        사람이 실제로 사용하는 환경을 고려해,
        <br /> 안정적인 서비스를 만드는 <br className='tb:hidden pc:hidden' />{' '}
        프론트엔드 개발자입니다.
      </h1>
      <h1 className='text-xl tb:text-2xl font-medium'>
        주문·결제·운영 도메인의 웹과 앱을 넘나들며, <br /> 빠른 구현과 지속
        가능한 유지 보수를 <br className='tb:hidden pc:hidden' />
        동시에 고민해왔습니다.
      </h1>
    </section>
  );
}
