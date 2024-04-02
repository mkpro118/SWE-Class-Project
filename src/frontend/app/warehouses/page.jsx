'use client';

import React, { useState, useEffect } from 'react';
import DropdownCard from '@/components/dropdown-card';

const Warehouses = () => {
  const [fullInventory, setFullInventory] = useState([]);

  //This will load in all the data from API
  useEffect(() => {
    const warehouse1 = { "city": "Atlanta", "state": "GA", "product": "737 Max", "type": "not sure", "quantity": 74, "id": 1930298 };
    const warehouse2 = { "city": "Madison", "state": "WI", "product": "747", "type": "not sure", "quantity": 36, "id": 1930299 };
    let tempArr = [];
    tempArr.push(warehouse1, warehouse2);
    setFullInventory(tempArr);
  }, []);

  return (
    <>
      <header className="mt-6 mb-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1 ml-4">
            <h2 className="text-2xl font-medium leading-7 text-gray-900">All Facilities ({fullInventory.length})</h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="hidden sm:block">
              <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <span className="sr-only">Action button</span>
                Sort
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
            </span>
            <span className="ml-3 hidden sm:block mr-2">
              <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <span className="sr-only">Action button</span>
                Filter
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
            </span>
            <span className="ml-3 hidden sm:block mr-4">
              <div className="relative">
                <input
                  type="search"
                  className="w-full rounded-md bg-white px-3 py-1.5 text-base font-semibold text-gray-700 shadow-sm ring-2 ring-inset ring-indigo-300 transition duration-200 ease-in-out placeholder:text-indigo-300 focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search" />
              </div>
            </span>
          </div>
        </div>
      </header>
      <div>
        {
          fullInventory.map(warehouse => {
            return <DropdownCard title={warehouse}>
              <p>Table for {warehouse.city}, {warehouse.state}</p>
            </DropdownCard>
          })
        }
      </div>
    </>
  )
}

export default Warehouses
