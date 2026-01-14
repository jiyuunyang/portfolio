import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section className='px-7 pt-4 pb-8 tb:px-9 tb:pt-8 tb:pb-12 pc:px-13 pc:pt-9 pc:pb-14 bg-gray-950'>
      <h2 className='text-xl tb:text-2xl font-bold text-gray-50'>Contact</h2>
      <div className='h-3' />
      <ul className='text-gray-50 leading-relaxed'>
        <li className='flex flex-row underline'>
          <Mail size={24} />
          <div className='w-2' />
          jiyangyoon@gmail.com
        </li>
        <li className='flex flex-row underline'>
          <Image
            src='/github-mark-white.svg'
            alt='github logo'
            width={24}
            height={24}
          />
          <div className='w-2' />
          github.com/jiyuunyang
        </li>
      </ul>
    </section>
  );
}
