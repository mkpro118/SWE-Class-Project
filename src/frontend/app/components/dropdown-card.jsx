'use client';

import React, { useState, useEffect } from 'react';
import TableFacilities from './table-facilities';

const DropdownCard = ({ props, airplaneData, componentData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [fullInventory, setFullInventory] = useState([]);

  const host = process.env.WEBSERVER_HOST || 'localhost';
  const port = process.env.WEBSERVER_PORT || 5000;
  const url = `http://${host}:${port}`;

  useEffect(() => {
    if (airplaneData && componentData) {
      setFullInventory([...airplaneData, ...componentData])
    }
  }, [airplaneData, componentData]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  }

  const handleSort = (columnName) => {
    if(sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
    setFullInventory(fullInventory.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if(typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return sortOrder === 'asc' ? 
        String(valueA).localeCompare(String(valueB)) : String(valueB).localeCompare(String(valueA));
      }      
    })
    );
  }

  return (
    //dropdown expandable component for each facility
    <div className='rounded-b-lg shadow mb-4'>
      
      {/* Make this a clickable component */}
      <div
        className= 'bg-white cursor-pointer justify-between items-center rounded-lg'
        onClick={toggleExpansion}
      >
        {/* City, State is main identifier for a facility */}
        <div className='border-b-2 px-4 py-4 '>
          <h2 className='text-lg font-semibold'>{props.city}, {props.state}</h2>
        </div>

        {/* Order data headers in one row, and data in the second row */}
        <div className='flex px-4 py-2 mb-4'>
          <div className="flex flex-wrap w-1/2">

            {/* Total number of airplanes at a facility is its completed airplanes + airplanes in progress */}
            <div className="flex flex-col w-1/4">
              <span className="text-md font-medium text-gray-400">Airplanes</span>
              <span className="font-medium">{props.airplanes + props.airplanesInProgress}</span>
            </div>

            {/* Total number of components at a facility is its completed components + components in progress */}
            <div className="flex flex-col w-1/4">
              <span className="text-md text-gray-400">Components</span>
              <span className="font-medium">{props.components + props.componentsInProgress}</span>
            </div>

            {/* Total number of employees at a facility */}
            <div className="flex flex-col w-1/4">
              <span className="text-md text-gray-400">Employees</span>
              <span className="font-medium">{props.employees}</span>
            </div>

            {/* Currently manager id, will need to change to manager name once SQL queries are done */}
            <div className="flex flex-col w-1/4">
              <span className="text-md text-gray-400">Manager</span>
              <span className="font-medium">{props.manager}</span>
            </div>
          </div>
          <div className='flex ml-auto'>
          
          {/* SVG of arrow to indicate component is expandable */}
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className='p-4'>
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('name')}>
                  Product {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('type')}>
                  Type {sortBy === 'type' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('cost')}>
                  Cost {sortBy === 'cost' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('production_stage')}>
                  Production Stage {sortBy === 'production_stage' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3" onClick={() => handleSort('ID')}>
                  ID {sortBy === 'ID' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {
            fullInventory.map(data => {
                  if(data.city == props.city && data.state == props.state){ // if the datas are in facility
                    return <TableFacilities key={data.ID}
                    cost={data.cost}
                    product={data.name}
                    type={data.type}
                    stage={data.production_stage}
                    id={data.ID}
                    city={data.city}
                    state={data.state} />
                  }
                })
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DropdownCard;
