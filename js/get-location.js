"use strict";

import get_weather from "./api-weather.js";
const location = document.querySelector(".location")
navigator.geolocation.getCurrentPosition(setLocation);
async function setLocation(GEOlocation) {
    console.log(GEOlocation)
    const weather = await get_weather("current",`${GEOlocation.coords.latitude},${GEOlocation.coords.longitude}`)
}