import React from 'react';
import Image from 'next/image';
import planeBlueprint from '../icons/PlaneBlueprint.jpeg'
import { getStageClass } from './table';

/**
 * Generates page for each plane with its additional information
 * 
 * @param plane a unique plane object
 * @returns html for the dynamic plane page
 */
const AirplaneInfo = (plane) => {
  return (

  //Image and table is aligned vertically
  <div className="flex flex-col items-center">

    {/*Display blueprint for airplane, will need to find blueprints for each plane once we get actual airplane data*/}
    <div className="mb-4">
      <Image src={planeBlueprint} alt="Plane Blueprint" width={700} height={700} />
    </div>

    {/* Generate table headers with all fields from airplane object*/}
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        {/* Plane name (model) and short description above the main table */}
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {plane.name}
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{plane.description}</p>
        </caption>
        
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">
              Facility
            </th>
            <th scope="col" className="px-6 py-3">
              Production Stage
            </th>
            <th scope="col" className="px-6 py-3">
              Cost
            </th>
            <th scope="col" className="px-6 py-3">
              Date Started
            </th>
            <th scope="col" className="px-6 py-3">
              Date Finished
            </th>
            <th scope="col" className="px-6 py-3">
              Seating Capacity
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              First Class
            </th>
            <th scope="col" className="px-6 py-3">
              Customer ID
            </th>
          </tr>
        </thead>

        {/*Content of each airplane to be displayed*/}
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

            {/*Facility identified by city, state */}
            <td className="px-6 py-4 whitespace-nowrap">
              {plane.city}, {plane.state}
            </td>

            {/* Conditionally render production stage color identifier for Unstarted, In-Progress, or Finished */}
            <td className="px-6 py-4">
              <span className={getStageClass(plane.production_stage)}>
                {plane.production_stage}
              </span>
            </td>

            {/* Cost of production */}
            <td className="px-6 py-4">
              {'$'}{plane.cost}
            </td>

            <td className="px-6 py-4">
              {plane.date_started}
            </td>
            
            <td className="px-6 py-4">
              {plane.date_finished}
            </td>

            {/* Seating capacity on plane */}
            <td className="px-6 py-4">
              {plane.seating_capacity}
            </td>

            {/* Size of plane Small, Medium, or Big */}
            <td className="px-6 py-4">
              {plane.size}
            </td>

            {/* Boolean for if plane has first class */}
            <td className="px-6 py-4">
              {`${plane.has_first_class}`}
            </td>

            {/*Customer who is buying the plane, will need to replace with actual customer name once SQL server is up */}
            <td className="px-6 py-4">
              {plane.customer_id}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AirplaneInfo;
