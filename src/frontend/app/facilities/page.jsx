'use client';

import React, { useState, useEffect } from 'react';
import DropdownCard from '@/app/components/dropdown-card';

const Facilities = () => {

  const host = process.env.WEBSERVER_HOST || 'localhost';
  const port = process.env.WEBSERVER_PORT || 15000;
  const url = `http://${host}:${port}`;

  const [facilities, setFacilities] = useState([]);

  const mapFacilityToCard = (facility) => {
    return {
      ID: facility.ID,
      city: facility.city,
      state: facility.state,
      components: facility.components_completed,
      componentsInProgress: facility.components_in_progress,
      description: facility.description,
      employees: facility.employee_count,
      manager: facility.manager_id,
      airplanes: facility.models_completed,
      airplanesInProgress: facility.models_in_production,
      name: facility.name,
      type: facility.type
    }
  }

  //This will load in all the data from API
  useEffect(() => {
    fetch(`${url}/facility`)
    .then(res => res.json())
    .then(data => data.map(mapFacilityToCard))
    .then((facility) => setFacilities(facility))
  }, [url]);

  useEffect(() => {
    console.log(facilities);
  }, [facilities]);

  return (
    <>
      <header className="mt-6 mb-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1 ml-4">
            <h2 className="text-2xl font-medium leading-7 text-gray-900">All Facilities ({facilities.length})</h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            {/* <span className="hidden sm:block">
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
            </span> */}
          </div>
        </div>
      </header>
      <div>
        {
          facilities.map(facility => {
            return <DropdownCard props={facility} key={facility.ID}/>
          })
        }
      </div>
    </>
  )
}

export default Facilities
