import get_weather from "./api-weather.js";

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
    headerOverlay.style.opacity = `${weatherObj.current.precip_mm / 0.9}`;
  } else {
    headerOverlay.classList.remove("rain-bg");
    headerOverlay.style.opacity = "1"
  }
  console.log(weatherConditionsEls);
  console.log(weatherObj);
}
const findWeatherBtn = document.querySelector(".find-weather");
const weatherImgEl = document.querySelector(".weather-img");

const searchInput = document.querySelector(".search-input");
const conditionsEl = document.querySelector(".conditions");

findWeatherBtn.addEventListener("click", () => {
  const location = searchInput.value;
  searchInput.value = "";
  setWeather(get_weather("current", location));
});
