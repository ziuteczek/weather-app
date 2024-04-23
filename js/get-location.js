"use strict";

import get_weather from "./api-weather.js";
import { setWeather } from "./main.js";

navigator.geolocation.getCurrentPosition((location) =>
  setWeather(
    get_weather(
      "current",
      `${location.coords.latitude},${location.coords.longitude}`
    )
  )
);
