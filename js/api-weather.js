'use strict';
export async function get_weather(type, location, language = "PL") {
  const api_data = await fetch(
    `https://api.weatherapi.com/v1/${type}.json?q=${location}&lang=${language}}`,
    {
      headers: {
        // I know It's a brad think to put API key online (I'm just silly little coder :( ))
        key: "49b2c1d65a0f4af7a30165924242204",
      },
    }
  ).then((data) => data.json());
  return api_data;
}
export async function get_typying_options(text_typed) {
  const api_data = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=49b2c1d65a0f4af7a30165924242204&q=${text_typed}`
  )
    .then((d) => d.json())
    .then((d) => d.map((el) => el.name));
  return api_data;
}

