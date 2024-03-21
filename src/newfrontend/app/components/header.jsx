'use client';

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from '@/app/hooks/useScroll';
import { cn } from '@/app/libs/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-20`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-indigo-300': selectedLayout,
        },
      )}
    >
      
      <div className="flex h-[64px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <div>Logo</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
