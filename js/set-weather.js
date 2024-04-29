const cardsContainer = document.querySelector(".cards-container");
const headerOverlay = document.querySelector(".header__sh");
export const weatherConditionsEls = {
  windSpeed: document.querySelector(".conditions__wind-speed"),
  pressure: document.querySelector(".conditions__pressure"),
  cloudy: document.querySelector(".conditions__cloudy"),
  temp: document.querySelector(".conditions__temp"),
  weatherImg: document.querySelector(".card-header__weather-img"),
  tempBox: document.querySelector(".card-header__temp-num"),
};
export function setCurrentWeather(currentWeatherObj) {
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
