'use client';

import React, { useState, useEffect } from 'react';
import Table from '@/app/components/table';
import axios from 'axios';

//Displays all warehouse inventory data

const MasterInventory = () => {

  const [fullInventory, setFullInventory] = useState([]);
  const [dataAPI, setDataAPI] = useState([]);
  const host = process.env.FRONTEND_HOST || 'localhost'; //what should this be?
  const port = process.env.WEBSERVER_PORT || 5000;
  const url = `http://127.0.0.1:${port}`;
  //This will load in all the data from API
  //fix the double load
  //may need to load in airplaces as well
  useEffect(() => {
    fetch(`${url}/airplane`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(
      data => {
        setDataAPI(data)
        console.log(data)
      }
    )
    const warehouse1 = { "city": "Atlanta", "state": "GA", "product": "737 Max", "type": "not sure", "quantity": 74, "id": 1930298 };
    const warehouse2 = { "city": "Madison", "state": "WI", "product": "747", "type": "not sure", "quantity": 36, "id": 1930299 };
    let tempArr = [];
    tempArr.push(warehouse1, warehouse2);
    setFullInventory(tempArr);
  }, []);

  return (
    <>
      {/*Header that displays total results in the table based on data within the array as well as styling for filter, sort, and search buttons/inputs.*/}
      <header className="mt-6 mb-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1 ml-4">
            <h2 className="text-2xl font-medium leading-7 text-gray-900">Results ({fullInventory.length})</h2>
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
      {/*Table header is not located in table component because it maps everytime leading to duplicate headers*/}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
              </th>
              <th scope="col" className="px-6 py-3">
                Warehouse
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              fullInventory.map(warehouse => {
                return <Table key={warehouse.id}
                  city={warehouse.city}
                  state={warehouse.state}
                  product={warehouse.product}
                  type={warehouse.type}
                  quantity={warehouse.quantity} />
              })
            }
          </tbody>
          {/*Navigation element here to ensure there isn't extra data displayed (maybe?) or make the table size static with the option to scroll*/}
        </table>
      </div>
    </>
  )
}

export default MasterInventory