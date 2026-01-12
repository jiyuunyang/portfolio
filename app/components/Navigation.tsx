'use client';
import { Menu, XIcon } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [showDropDown, setShowDrownDown] = useState(false);

  return (
    <div>
      <nav className='py-10 items-center fixed top-0 h-full w-52 bg-gray-100 border-b-gray-300 border-b hidden pc:block'>
        <p className='p-5'>메뉴1</p>
        <p className='p-5'>메뉴1</p>
        <p className='p-5'>메뉴1</p>
        <p className='p-5'>메뉴1</p>
      </nav>
      <nav className='flex items-center fixed top-0 w-full h-12 bg-gray-100 border-b-gray-300 border-b pc:hidden'>
        <button
          className='h-8 w-8 m-2 flex justify-center items-center'
          onClick={() => setShowDrownDown(true)}
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>
      </nav>
      <div
        className={`p-5 bg-gray-100 ${
          showDropDown ? 'absolute' : 'hidden'
        } w-full pc:hidden`}
      >
        <button
          className='h-8 w-8 mb-2 flex justify-center items-center'
          onClick={() => setShowDrownDown(false)}
        >
          <XIcon size={24} strokeWidth={2.5} />
        </button>
        <p className='px-2 py-5'>메뉴1</p>
        <p className='px-2 py-5'>메뉴1</p>
        <p className='px-2 py-5'>메뉴1</p>
        <p className='px-2 py-5'>메뉴1</p>
      </div>
    </div>
  );
}
