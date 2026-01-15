'use client';

import { Menu, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const HOME_PAGE: { name: string; id: string }[] = [
  { name: 'About', id: '#about' },
  { name: 'Skills', id: '#skills' },
  { name: 'Projects', id: '#projects' },
  { name: 'Experience', id: '#experience' },
  { name: 'Contact', id: '#contact' },
];
const PROJECT_PAGE: { name: string; id: string }[] = [
  { name: '메인으로', id: '/' },
  { name: '프로젝트 이름', id: '#summary' },
  { name: '- 프로젝트 개요', id: '#outline' },
  { name: '- 담당 역할', id: '#role' },
  { name: '- 주요 구현 내용', id: '#features' },
  { name: '- 기술적 고민', id: '#technical-challenge' },
  { name: '- 결과 및 성과', id: '#result' },
  { name: '- 회고', id: '#retrospect' },
];

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const menuList = pathname.includes('projects') ? PROJECT_PAGE : HOME_PAGE;
  const ids = menuList.map((item) => item.id);
  const activeSection = useScrollSpy(ids);
  // TODO 1 : 프로젝트 이름 #summary 의 경우 불러오는 데이터에 따라 이름이 달라져야함
  // TODO 2 : 스크롤 이벤트시 해당 이름이 하이라이트 되어야함
  // TODO 3 : 스크롤시 좀 더 스무스하게
  // TODO 4 : 네비게이션 드롭바 내려올 때 dim 처리

  return (
    <>
      {/* PC SIDE NAV */}
      <nav
        className='
        hidden pc:flex flex-col items-start
        fixed top-0 h-full w-52 pt-6 px-3
        bg-gray-50 border-r border-gray-300
        z-20
        text-lg
      '
      >
        {menuList.map((item) => {
          const isActive = activeSection == item.id;
          return (
            <Link
              key={item.id}
              href={item.id}
              className={`p-3 hover:opacity-70 ${
                isActive ? 'font-bold text-black' : 'text-gray-800'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* MOBILE TOP BAR */}
      <nav
        className='
        flex pc:hidden items-center
        fixed top-0 w-full h-12
        bg-gray-50 border-b border-gray-300
        z-30
      '
      >
        <button
          className='h-8 w-8 m-2 flex items-center justify-center cursor-pointer'
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
          z-40 pc:hidden
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
            <Link
              key={item.id}
              href={item.id}
              className={`block px-2 py-4 ${
                isActive ? 'font-bold text-black' : 'text-gray-800'
              }`}
              onClick={() => {
                setIsDropdownOpen(false);
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </>
  );
}
