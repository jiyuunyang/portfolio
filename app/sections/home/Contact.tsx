'use client';
import Image from 'next/image';
import { Mail } from 'lucide-react';

type Props = {
  id: string;
};

export default function Contact({ id }: Props) {
  const email = 'jiyuunyang@gmail.com';
  const github = 'https://github.com/jiyuunyang';

  return (
    <section
      id={id}
      className='px-7 pt-4 pb-8 
      tb:px-9 tb:pt-8 tb:pb-12 
      pc:px-13 pc:pt-9 pc:pb-14 
      bg-gray-950 flex flex-col gap-3'
    >
      <h2 className='text-xl tb:text-2xl font-bold text-gray-50'>Contact</h2>

      <ul className='text-gray-50 leading-relaxed'>
        <li>
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${email}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 underline hover:opacity-80'
          >
            <Mail size={20} />
            <span>{email}</span>
          </a>
        </li>

        <li>
          <a
            href={github}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 underline hover:opacity-80'
          >
            <Image
              src='/github-mark-white.svg'
              alt='GitHub logo'
              width={20}
              height={20}
            />
            <span>{github}</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
