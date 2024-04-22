'use client';

import React, { useState, useEffect } from 'react';
import Table from '@/app/components/table';

const MasterInventory = () => {

  const [fullInventory, setFullInventory] = useState([]);
  const [fullInventorySearch, setFullInventorySearch] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [airplaneData, setAirplaneData] = useState([]);
  const [pageActive, setPageActive] = useState(1);
  const [prodLookup, setProdLookup] = useState("");
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
      setFullInventorySearch([...airplaneData, ...componentData]);
    }
  }, [airplaneData, componentData]);

  //Search helper
  useEffect(() => {
    const results = fullInventorySearch.filter((data) => 
      (data.ID.toString().includes(prodLookup.toString().trim())) || 
      ((data.name.toString()).toLowerCase().includes((prodLookup.toString()).toLowerCase().trim())));

    setFullInventory(results)
  }, [prodLookup, fullInventorySearch])
  
  const handleReset = () => {
    setProdLookup("");
  }

  //Pagination helper
  let pages = []
  const pageBuilder = () => {
    const numPages = Math.ceil(fullInventory.length / 12);
    for (let i = 1; i <= numPages; i++) { //Used to declare an active page and push to pages array for navigation
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
  
  //Previous and Next button functionality
  const handleNextPage = () => {
    setPageActive(prevPage => prevPage + 1);
  }
  const handlePreviousPage = () => {
    setPageActive(prevPage => prevPage - 1);
  }

  return (
    <>
      {/*Header to displays results, filter button, and search bar*/}
      <header className="mt-6 mb-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1 ml-4">
            <h2 className="text-2xl font-medium leading-7 text-gray-900">Results ({fullInventory.length})</h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
          
          {/*Filter button*/}
            <span className="ml-3 hidden sm:block mr-2">
              <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <span className="sr-only">Action button</span>
                Filter
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
            </span>

          {/*Search bar - add in search by name*/}
            <div className="flex items-center flex-column flex-wrap md:flex-row ml-3 hidden sm:block mr-4">
              <div className="relative">
                <input id="search" className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-normal text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition duration-200 ease-in-out placeholder:text-gray-400 focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                       placeholder="Search"
                       maxLength={10}
                       onChange={(e) => setProdLookup(e.target.value)}
                       value={prodLookup}/>
                
                {/*Reset button*/}
                <button className="text-white absolute end-1 bottom-1 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1"
                        onClick={handleReset}>
                        Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/*Table display*/}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-100">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          
          {/*Table header*/}
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="p-4">
              </th>
              <th scope="col" className="px-6 py-3">
                Facility
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
            </tr>
          </thead>
          
          {/*Table body (data sent as props to components/tables.jsx)*/}
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
                  id={data.ID} />
              })
            }
          </tbody>
        </table>
        
        {/*Page navigation*/}
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
