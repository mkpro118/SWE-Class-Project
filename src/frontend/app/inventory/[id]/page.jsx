import React from 'react';
import AirplaneInfo from '../../components/additional-airplane-data.jsx'

const host = process.env.WEBSERVER_HOST || 'localhost';
// console.log(host);
const port = process.env.WEBSERVER_PORT || 5000;
// console.log(port)
const url = `http://${host}:${port}`;

/**
 * Generates unique page for each Airplane using dynamic rendering
 * 
 * @param params the id : value mapping passed when clicking on a dynamic page
 * @returns An AirplaneInfo object with the passed props
 */
export default async function AirplanePage({params}) {
    const props = await getAirplane(params.id)
    console.log(props)
    return <AirplaneInfo {...props}/>
    
  };

/**
 * Fetches a single airplane based on id
 * 
 * @param id the id for a specific airplane
 * @returns the airplane object corresponding to the id
 */
async function getAirplane(id) {
  const res = await fetch(`${url}/airplane/${id}`);
  const data = await res.json();
  return data[0];
}

  /**
   * Generates prerendered static params for each plane 
   * using Server Side Generation
   * 
   * Use this at build time if planes do not change often
   * 
   * @returns a key value pair id : plane.ID for each plane
   */
  // export async function generateStaticParams() {
  //   const res = await fetch(`${url}/airplane`);
  //   const airplanes = await res.json();
  //   // console.log(airplanes);
  //   // const ids = airplanes.map((plane) => ({
  //   //   id: plane.ID.toString(),
  //   // }))
  //   // console.log(ids);
  //   return airplanes.map((plane) => ({
  //     ID: plane.ID.toString(),
  //   }))
  // }




