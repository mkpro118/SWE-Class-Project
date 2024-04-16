'use client';

import React, { useState, useEffect } from 'react';
import Table from './table';

const DropdownCard = ({ props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [fullInventory, setFullInventory] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [airplaneData, setAirplaneData] = useState([]);

  const host = process.env.WEBSERVER_HOST || 'localhost';
  const port = process.env.WEBSERVER_PORT || 15000;
  const url = `http://${host}:${port}`;

  //Load in all the data from API into corresponding arrays
  useEffect(() => {
    fetch(`${url}/airplane`)
    .then(res => res.json())
    .then(
      data => {
        setAirplaneData(data)
        console.log(data)
      }
    )
    fetch(`${url}/component`)
    .then(res => res.json())
    .then(
      data => {
        setComponentData(data)
        console.log(data)
      }
    )
  }, [url]);

  useEffect(() => {
    if (airplaneData && componentData) {
      setFullInventory([...airplaneData, ...componentData])
    }
  }, [airplaneData, componentData]);

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className='p-4'>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Type                  
                </th>
                <th scope="col" className="px-6 py-3">
                  Cost
                </th>
                <th scope="col" className="px-6 py-3">
                  Production Stage
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
            {
            fullInventory.map(data => {
                  if(data.city == props.city && data.state == props.state){ // if the datas are in facility
                    return <Table key={data.id}
                    cost={data.cost}
                    product={data.name}
                    type={data.type}
                    stage={data.production_stage}
                    ID={data.ID}
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
