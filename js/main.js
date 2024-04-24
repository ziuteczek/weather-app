import * as apiWeather from './api-weather.js'
import getGEOlocation from "./get-location.js"


const weekDayEl = document.querySelector(".week-day");
const dayMonthEl = document.querySelector(".day-month");
function showDate() {
  const currentDate = new Date();
  weekDayEl.textContent = currentDate.toLocaleDateString("PL", {
    weekday: "long",
  });
  dayMonthEl.textContent = currentDate.toLocaleDateString("PL", {
    day: "numeric",
    month: "long",
  });
}
showDate();

const location = document.querySelector(".location");
const headerOverlay = document.querySelector(".sh");
// const weatherConditionEl = document.querySelectorAll(".weather-condition");
const weatherConditionsEls = {
  windSpeed: document.querySelector(".wind-speed"),
  pressure: document.querySelector(".pressure"),
  cloudy: document.querySelector(".cloudy"),
  temp: document.querySelector(".temp"),
};

export async function setWeather(weatherObj) {
  weatherObj = await weatherObj;
  location.textContent = weatherObj.location.name;
  weatherConditionsEls.windSpeed.textContent = `${Math.round(
    weatherObj.current.wind_kph
  )}`;
  weatherConditionsEls.pressure.textContent = `${weatherObj.current.pressure_mb}`;
  weatherConditionsEls.temp.textContent = `${weatherObj.current.temp_c}`;
  weatherConditionsEls.cloudy.textContent = `${weatherObj.current.cloud}`;
  if (weatherObj.current.precip_mm) {
    headerOverlay.classList.add("rain-bg");
    headerOverlay.style.opacity = `${weatherObj.current.precip_mm / 0.8}`;
  } else {
    headerOverlay.classList.remove("rain-bg");
    headerOverlay.style.opacity = "1"
  }
  console.log(weatherConditionsEls);
  console.log(weatherObj);
}
const findWeatherBtn = document.querySelector(".find-weather");

const searchInput = document.querySelector(".search-input");

findWeatherBtn.addEventListener("click", () => {
  const location = searchInput.value;
  searchInput.value = "";
  setWeather(apiWeather.get_weather("current", location));
});
setWeather(apiWeather.get_weather("current",await getGEOlocation()))

const searchEl = document.querySelector(".search-input");
const searchBoxEls = document.querySelector(".search-option-box");


async function typingHint(e) {
  const hints = await apiWeather.get_typying_options(e.target.value);
  searchBoxEls.innerHTML = "";
  if (!hints.length || !hints) {
    return;
  }
  if (searchEl.textContent) {
    searchBoxEls.innerHTML = ""
    return;
  }
  hints.slice(0, 3).forEach((location) => {
    console.log(location);
    searchBoxEls.insertAdjacentHTML(
      "beforeend",
      `<button class="search-option">${location}</button>`
    );
  });
  const hintsEls = document.querySelectorAll(".search-option");
  hintsEls.forEach((option) => {
    option.addEventListener("click", (e) => {
      searchEl.value = e.target.textContent;
      console.log(e.target.textContent)
      searchBoxEls.innerHTML = "";
    });
  });
}

searchEl.addEventListener("input", typingHint);
document.body.addEventListener("click", () => searchBoxEls.innerHTML = "")