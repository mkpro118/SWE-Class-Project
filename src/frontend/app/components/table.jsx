import React from 'react'
import Link from 'next/link';

//Loads in the data mapped from inventory/page.jsx 
//Checkboxes missing functionality 
//Edit missing functionality

/**
 * Conditionally renders a color scheme for different stages
 * @param stage the stage the product is in - Unstarted, In-Progress, or Finished
 * @returns 
 */
export function getStageClass(stage) {
  switch (stage) {
    case "Unstarted":
      return "bg-red-500";
    case "In-Progress":
      return "bg-yellow-500 ";
    case "Finished":
      return "bg-green-500";
    default:
      return "";
  }
}

const Table = (props) => {
  return (

    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {props.city + ', ' + props.state}
      </th>
      <td className="px-6 py-4">
      {
        props.type == "Airplane" ? 
        <div className='text-blue-600'>
          <Link href="../inventory/[id]" as={`../inventory/${props.id}`}>{props.product}</Link>
        </div>
        :
          props.product
        }
      </td>
      <td className="px-6 py-4">
        {props.type}
      </td>
      <td className="px-6 py-4">
        {'$'}{props.cost}
      </td>
      <td className="px-6 py-4 text-black">
        <span className={`px-2 py-1 rounded opacity-50 ${getStageClass(props.stage)}`}>
            {props.stage}
        </span>
      </td>
      <td className="px-6 py-4">
        {props.id}
      </td>
    </tr>
  )
}

export default Table