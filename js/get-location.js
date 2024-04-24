"use strict";

function getGEOlocationObj() {
  return new Promise((resolve)=>navigator.geolocation.getCurrentPosition((location) => resolve(location)))}

export default async function getGEOlocation(){
  const location =  await getGEOlocationObj()
  console.log(location.coords)
  return `${location.coords.latitude},${location.coords.longitude}`
}