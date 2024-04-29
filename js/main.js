import * as apiWeather from "./api-weather.js";
import getGEOlocation from "./get-location.js";

let displayWeekForecast = false;

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
  weatherImg: document.querySelector(".weather-img"),
  tempBox: document.querySelector(".temp-card"),
};

export async function setWeather(weatherObj) {
  weatherObj = await weatherObj;
  location.textContent = weatherObj.location.name;
  setCurrentWeather(weatherObj.current);
  setForecastWeather(weatherObj.forecast);

  console.log(weatherConditionsEls);
  console.log(weatherObj);
}
function genDiagram(dayForecast) {
  const diagram = document.createElement("div");
  diagram.classList.add("diagram");
  const temperatureArr = dayForecast.map((hour) => hour.temp_c);
  const minTemp = Math.min(...temperatureArr);
  const tempArrAbs = temperatureArr.map((temp) => temp + minTemp);
  const minTempAbs = Math.min(...tempArrAbs);
  const tempMin0Arr = tempArrAbs.map((temp) => temp - minTempAbs);
  const maxMin0 = Math.max(...tempMin0Arr);
  console.log(tempMin0Arr)
  console.log(tempArrAbs)
  tempMin0Arr.forEach((temp) => {
    const tempBar = document.createElement("div");
    tempBar.classList.add("card__temp-bar");
    tempBar.style.height = `${(temp / maxMin0) * 100}%`;
    if (temp === maxMin0) {
      tempBar.classList.add("card__temp-bar--highest");
    }
    diagram.insertAdjacentElement("beforeend", tempBar);
  });
  console.log(diagram);
  return diagram;
}

const cardsContainer = document.querySelector(".cards-container");
const createCards = (forecastWeatherObj) =>
  forecastWeatherObj.forecastday.map((d) => {
    const date = new Date(d.date);

    const card = document.createElement("div");
    card.classList.add("card");

    const weatherIcon = document.createElement("img");
    weatherIcon.src = d.day.condition.icon;
    weatherIcon.classList.add("card__icon");

    const weatherTime = document.createElement("p");
    weatherTime.classList.add("card__time");
    weatherTime.textContent = date.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
    });

    const weatherTemperature = document.createElement("p");
    weatherTemperature.classList.add("card__temperature");
    weatherTemperature.textContent =
      Math.round((d.day.maxtemp_c + d.day.mintemp_c) / 2) + "°C";

    const weatherWind = document.createElement("span");
    weatherWind.classList.add("card__wind-speed");
    weatherWind.textContent = Math.round(d.day.maxwind_kph) + "km/h";

    const rainChance = document.createElement("span");
    rainChance.classList.add("card__rain-chance");
    rainChance.textContent = d.day.daily_chance_of_rain + "%";

    const weatherConditions = document.createElement("p");
    weatherConditions.classList.add("card__conditions");
    weatherConditions.append(weatherWind);
    weatherConditions.append(rainChance);

    const weatherDescription = document.createElement("p");
    weatherDescription.classList.add("card__description");
    weatherDescription.textContent = d.day.condition.text;

    const weatherInfo = document.createElement("div");
    weatherInfo.classList.add("card__info");
    weatherInfo.insertAdjacentElement("beforeend", genDiagram(d.hour));
    [
      weatherIcon,
      weatherTime,
      weatherTemperature,
      weatherConditions,
      weatherDescription,
      weatherInfo,
    ].forEach((el) => card.insertAdjacentElement("beforeend", el));
    return card;
  });
function setForecastWeather(forecastWeatherObj) {
  const cards = createCards(forecastWeatherObj);
  cards.forEach((card) => cardsContainer.append(card));
}
function setCurrentWeather(currentWeatherObj) {
  cardsContainer.innerHTML = "";
  weatherConditionsEls.windSpeed.textContent = `${Math.round(
    currentWeatherObj.wind_kph
  )}`;
  weatherConditionsEls.pressure.textContent = `${currentWeatherObj.pressure_mb}`;
  weatherConditionsEls.temp.textContent = `${currentWeatherObj.temp_c}`;
  weatherConditionsEls.cloudy.textContent = `${currentWeatherObj.cloud}`;
  weatherConditionsEls.weatherImg.src = currentWeatherObj.condition.icon;
  weatherConditionsEls.tempBox.textContent = `${Math.round(
    currentWeatherObj.temp_c
  )}`;
  if (currentWeatherObj.precip_mm) {
    headerOverlay.classList.add("rain-bg");
    headerOverlay.style.opacity = `${currentWeatherObj.precip_mm / 0.8}`;
  } else {
    headerOverlay.classList.remove("rain-bg");
    headerOverlay.style.opacity = "1";
  }
}
const findWeatherBtn = document.querySelector(".find-weather");

const searchInput = document.querySelector(".search-input");

findWeatherBtn.addEventListener("click", () => {
  const location = searchInput.value;
  searchInput.value = "";
  setWeather(apiWeather.get_weather("forecast", location, "&days=7"));
});
setWeather(
  apiWeather.get_weather("forecast", await getGEOlocation(), "&days=7")
);

const searchEl = document.querySelector(".search-input");
const searchBoxEls = document.querySelector(".search-option-box");

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

searchEl.addEventListener("input", typingHint);
document.body.addEventListener("click", () => (searchBoxEls.innerHTML = ""));
