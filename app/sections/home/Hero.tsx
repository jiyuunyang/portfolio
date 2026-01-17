const animationEffect1 = `
  marker
  relative inline-block
  bg-[linear-gradient(to_right,rgba(253,224,71,0.5),rgba(253,224,71,0.5))]
  bg-no-repeat bg-left-bottom
  px-1
`;

const animationEffect2 = `
  marker marker-delay
  relative inline-block
  bg-[linear-gradient(to_right,rgba(71,253,114,0.4),rgba(71,253,114,0.4))]
  bg-no-repeat bg-left-bottom
  px-1
`;

export default function Hero() {
  return (
    <section
      className='mx-5 px-2 py-6 
    tb:px-4 tb:py-10 
    pc:px-8 pc:py-12 border-b 
    flex flex-col gap-3'
    >
      <h1 className='text-xl tb:text-2xl font-bold'>
        사람이 실제로 사용하는 환경을 고려해,
        <br />
        <span className={animationEffect1}>안정적인 서비스</span>를 만드는
        <br />
        프론트엔드 개발자입니다.
      </h1>
      <h1 className='text-xl tb:text-2xl font-medium'>
        웹과 앱을 넘나들며,
        <br />
        빠른 구현과{' '}
        <span className={animationEffect2}>지속 가능한 유지 보수</span>를 <br />
        동시에 고민해왔습니다.
      </h1>
    </section>
  );
}
