'use client';

import React, { useState } from 'react';
import Table from './table';

const DropdownCard = ({ props, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className='rounded-b-lg shadow mb-4'>
      <div
        className= 'bg-white cursor-pointer justify-between items-center rounded-lg'
        onClick={toggleExpansion}
      >
        <div className='border-b-2 px-4 py-4 '>
          <h2 className='text-lg font-semibold'>{props.city}, {props.state}</h2>
        </div>

        <div className='flex px-4 py-2 mb-4'>
          <div className="flex flex-wrap w-1/2">
            <div className="flex flex-col w-1/4">
              <span className="text-md font-medium text-gray-400">Airplanes</span>
              <span className="font-medium">{props.airplanes}</span>
            </div>
            <div className="flex flex-col w-1/4">
              <span className="text-md text-gray-400">Components</span>
              <span className="font-medium">{props.components}</span>
            </div>
            <div className="flex flex-col w-1/4">
              <span className="text-md text-gray-400">Employees</span>
              <span className="font-medium">{props.employees}</span>
            </div>
            <div className="flex flex-col w-1/4">
              <span className="text-md text-gray-400">Manager</span>
              <span className="font-medium">{props.manager}</span>
            </div>
          </div>
          <div className='flex ml-auto'>
          <svg
            className={`h-6 w-6 transition-transform transform ${isExpanded ? 'rotate-360' : ''
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
        </div>
      </div>
      {isExpanded && (
        <div className='p-4 border-t'>
          <Table/>
        </div>
      )}

    </div>
  );
};

export default DropdownCard;
