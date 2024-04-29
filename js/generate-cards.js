function genDiagram(dayForecast) {
  const diagram = document.createElement("div");
  diagram.classList.add("diagram");
  const temperatureArr = dayForecast.map((hour) => hour.temp_c);
  const minTemp = Math.min(...temperatureArr);
  const tempArrAbs = temperatureArr.map((temp) => temp + minTemp);
  const minTempAbs = Math.min(...tempArrAbs);
  const tempMin0Arr = tempArrAbs.map((temp) => temp - minTempAbs);
  const maxMin0 = Math.max(...tempMin0Arr);
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
export const createCards = (forecastWeatherObj) =>
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
