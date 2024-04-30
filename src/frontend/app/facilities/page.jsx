'use client';

import React, { useState, useEffect } from 'react';
import DropdownCard from '@/app/components/dropdown-card';

const Facilities = () => {

  const host = process.env.WEBSERVER_HOST || 'localhost';
  const port = process.env.WEBSERVER_PORT || 5000;
  const url = `http://${host}:${port}`;

  const [facilities, setFacilities] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [airplaneData, setAirplaneData] = useState([]);

  const mapFacilityToCard = (facility) => {
    return {
      id: facility.ID,
      city: facility.city,
      state: facility.state,
      components: facility.components_completed,
      componentsInProgress: facility.components_in_production,
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
  }, []);

  useEffect(() => {
    console.log(facilities);
  }, [facilities]);

  //Load in all the data from API into corresponding arrays
  useEffect(() => {
    //load airplanes
    fetch(`${url}/airplane`)
    .then(res => res.json())
    .then(
      data => {
        setAirplaneData(data)
      }
    )
    //load components
    fetch(`${url}/component`)
    .then(res => res.json())
    .then(
      data => {
        setComponentData(data)
      }
    )
  }, []);

  return (
    <>
      <header className="mt-6 mb-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1 ml-4">
            <h2 className="text-2xl font-medium leading-7 text-gray-900">All Facilities ({facilities.length})</h2>
          </div>
        </div>
      </header>
      <div>
        {
          facilities.map(facility => {
            return <DropdownCard
                props={facility}
                airplaneData={airplaneData}
                componentData={componentData}
                key={facility.id}
            />
          })
        }
      </div>
    </>
  )
}

export default Facilities
