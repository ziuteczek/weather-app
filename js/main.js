const weekDayEl = document.querySelector(".week-day");
const dayMonthEl = document.querySelector(".day-month");
function showDate() {
  weekDayEl.textContent = new Date().toLocaleDateString("PL", {
    weekday: "long",
  });
  dayMonthEl.textContent = new Date().toLocaleDateString("PL", {
    day: "numeric",
    month: "long",
  });
}
showDate();
const location = document.querySelector(".location");
const weatherConditions = {
  windSpeed: doc
}
function setWeather(weatherObj) {
  location.textContent = weatherObj.location.name;
  
}
