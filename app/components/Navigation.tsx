'use client';

import { Menu, XIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const HOME_PAGE: { name: string; id: string; type: 'scroll' | 'router' }[] = [
  { name: 'About', id: '#about', type: 'scroll' },
  { name: 'Skills', id: '#skills', type: 'scroll' },
  { name: 'Projects', id: '#projects', type: 'scroll' },
  { name: 'Experience', id: '#experience', type: 'scroll' },
  { name: 'Contact', id: '#contact', type: 'scroll' },
];
const PROJECT_PAGE: { name: string; id: string; type: 'scroll' | 'router' }[] =
  [
    { name: '메인으로', id: `/`, type: 'router' },
    { name: '프로젝트명', id: '#summary', type: 'scroll' },
    { name: '- 프로젝트 개요', id: '#outline', type: 'scroll' },
    { name: '- 담당 역할', id: '#role', type: 'scroll' },
    { name: '- 주요 구현 내용', id: '#features', type: 'scroll' },
    { name: '- 기술적 고민', id: '#technical-challenge', type: 'scroll' },
    { name: '- 성과 및 회고', id: '#result', type: 'scroll' },
  ];

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuList = pathname.includes('projects') ? PROJECT_PAGE : HOME_PAGE;
  const ids = menuList.map((item) => item.id);
  const activeSection = useScrollSpy(ids);

  return (
    <>
      {/* PC SIDE NAV */}
      <nav
        className='
        hidden pc:flex flex-col items-start
        fixed top-0 h-full w-52 pt-6 px-3
        dark:bg-gray-900
        bg-gray-50 border-r border-gray-300
        dark:border-gray-700
        z-20
        text-lg
      '
      >
        {menuList.map((item) => {
          const isActive = activeSection == item.id;
          return (
            <button
              key={item.id}
              onClick={() =>
                item.type === 'router' ? router.back() : router.push(item.id)
              }
              className={`p-3 hover:opacity-70 ${
                isActive ? 'font-bold' : 'opacity-80'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* MOBILE TOP BAR */}
      <nav
        className='
        flex pc:hidden items-center
        fixed top-0 w-full h-12
        bg-gray-50 
        dark:bg-gray-900
        border-b border-gray-300
        dark:border-gray-700
        z-30
      '
      >
        <button
          className='h-8 w-8 m-2 
          flex items-center justify-center 
          cursor-pointer'
          onClick={() => setIsDropdownOpen(true)}
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      <div
        className={`
          fixed top-0 left-0 w-full
          bg-gray-50 p-3
          dark:bg-gray-900
          z-40 
          pc:hidden
          text-lg
          transition-transform duration-200
          ${isDropdownOpen ? 'translate-y-0' : '-translate-y-full'}
          ${isDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <button
          className='h-8 w-8 mb-4 flex items-center justify-center'
          onClick={() => setIsDropdownOpen(false)}
        >
          <XIcon size={24} strokeWidth={2.5} />
        </button>

        {menuList.map((item) => {
          const isActive = activeSection == item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.type === 'router') {
                  router.back();
                } else {
                  router.push(item.id);
                }
                setIsDropdownOpen(false);
              }}
              className={`block px-2 py-4 ${isActive ? 'font-bold' : ''}`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* MOBILE DROPDOWN 시 DIM Box */}
      {isDropdownOpen && (
        <div
          className='
          fixed inset-0
          bg-black/40      
          z-30
          pc:hidden
          transition-opacity duration-200'
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
}
