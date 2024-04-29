import * as apiWeather from "./api-weather.js";
import getGEOlocation from "./get-location.js";
import { createCards } from "./generate-cards.js";
import { setCurrentWeather } from "./set-weather.js";
import { weatherConditionsEls } from "./set-weather.js";
let displayWeekForecast = false;

const weekDayEl = document.querySelector(".info__week-day");
const dayMonthEl = document.querySelector(".info__day-month");

const searchEl = document.querySelector(".nav__search-input");
const searchBoxEls = document.querySelector(".nav__browser-hints");
const location = document.querySelector(".info__location");
const cardsContainer = document.querySelector(".cards-container");

const findWeatherBtn = document.querySelector(".nav__find-weather");
const searchInput = document.querySelector(".nav__search-input");

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
async function setWeather(weatherObj) {
  weatherObj = await weatherObj;
  location.textContent = weatherObj.location.name;
  setCurrentWeather(weatherObj.current);
  setForecastWeather(weatherObj.forecast);

  console.log(weatherConditionsEls);
  console.log(weatherObj);
}
function setForecastWeather(forecastWeatherObj) {
  const cards = createCards(forecastWeatherObj);
  cards.forEach((card) => cardsContainer.append(card));
}
findWeatherBtn.addEventListener("click", () => {
  const location = searchInput.value;
  searchInput.value = "";
  setWeather(apiWeather.get_weather("forecast", location, "&days=7"));
});
async function typingHint(e) {
  const hints = await apiWeather.get_typying_options(e.target.value);
  searchBoxEls.innerHTML = "";
  if (!hints.length || !hints) {
    return;
  }
  if (searchEl.textContent) {
    searchBoxEls.innerHTML = "";
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
      console.log(e.target.textContent);
      searchBoxEls.innerHTML = "";
    });
  });
}
setWeather(
  apiWeather.get_weather("forecast", await getGEOlocation(), "&days=7")
);
showDate();
searchEl.addEventListener("input", typingHint);
document.body.addEventListener("click", () => (searchBoxEls.innerHTML = ""));
