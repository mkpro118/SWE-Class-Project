'use client';

import React, { useState } from 'react';

const DropdownCard = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className='border rounded-lg overflow-hidden shadow'>
      <div
        className='bg-gray-200 px-4 py-2 cursor-pointer flex justify-between items-center'
        onClick={toggleExpansion}
      >
        <h2 className='text-lg font-semibold'>{title.city + ', ' + title.state}</h2>
        <svg
          className={`h-6 w-6 transition-transform transform ${
            isExpanded ? 'rotate-360' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isExpanded ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
          />
        </svg>
      </div>
      { isExpanded && (
        <div className='p-4 border-t'>
          {children}
        </div>
      )}

    </div>
  );
};

export default DropdownCard;
