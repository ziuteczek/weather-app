"use strict";

import get_weather from "./api-weather.js";
import { setWeather } from "./main.js";

function getGEOlocationObj() {
  return new Promise((resolve)=>navigator.geolocation.getCurrentPosition((location) => resolve(location)))}

export default async function getGEOlocation(){
  const location =  await getGEOlocationObj()
  console.log(location.coords)
  return `${location.coords.latitude},${location.coords.longitude}`
}