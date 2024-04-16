'use client';

import React, { useState, useEffect } from 'react';
import Table from '@/app/components/table';

//Displays all warehouse inventory data
const MasterInventory = () => {

  const [fullInventory, setFullInventory] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [airplaneData, setAirplaneData] = useState([])
  const [pageActive, setPageActive] = useState(1);
  const host = process.env.WEBSERVER_HOST || 'localhost';
  const port = process.env.WEBSERVER_PORT || 5000;
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

  // Merge fetched data into one array at runtime
  useEffect(() => {
    if (airplaneData && componentData) {
      setFullInventory([...airplaneData, ...componentData])
    }
  }, [airplaneData, componentData]);

  //Pagination helpers
  let pages = []
  const pageBuilder = () => {
    const numPages = Math.ceil(fullInventory.length / 12);
    
    //Loop is used to determine an active page and push to pages array for navigation
    for (let i = 1; i <= numPages; i++) {
      if (pageActive === i) {
        pages.push(
        <a className="flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
          aria-current="true"
          key={i}
          onClick={() => setPageActive(i)}>{i}</a>)
      }
      else {
        pages.push(
          <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            aria-current="false"
            key={i}
            onClick={() => setPageActive(i)}>{i}</a>)
      }
    }
    return pages
  }
  const handleNextPage = () => {
    setPageActive(prevPage => prevPage + 1);
  }

  const handlePreviousPage = () => {
    setPageActive(prevPage => prevPage - 1);
  }

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
                  className="w-full rounded-md bg-white px-3 py-1.5 text-base font-semibold text-gray-700 shadow-sm ring-2 ring-inset ring-indigo-300 transition duration-200 ease-in-out placeholder:text-indigo-300 focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                  placeholder="Search"
                  aria-label="Search" />
              </div>
            </span>
          </div>
        </div>
      </header>
      {/*Table header is not located in table component because it maps everytime leading to duplicate headers*/}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-100">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
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
                Cost
              </th>
              <th scope="col" className="px-6 py-3">
                Production Stage
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              fullInventory.slice(12 * (pageActive - 1), 12 * pageActive).map(data => {
                return <Table key={data.ID}
                  city={data.city}
                  state={data.state}
                  cost={data.cost}
                  product={data.name}
                  type={data.type}
                  stage={data.production_stage}
                  ID={data.ID} />
              })
            }
          </tbody>
          {/*Navigation element here to ensure there isn't extra data displayed (maybe?) or make the table size static with the option to scroll*/}
        </table>
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between mt-2 mb-2 ml-4">
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <button onClick={handlePreviousPage} disabled={(pageActive === 1)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous
            </button>
            {pageBuilder()}
            <button onClick={handleNextPage} disabled={(pageActive === (pages.length))} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next
            </button>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MasterInventory