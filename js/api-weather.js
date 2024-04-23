export default async function get_weather(type, location, language = "PL") {
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
async function typying_options(text_typed) {
  const api_data = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=49b2c1d65a0f4af7a30165924242204&q=${text_typed}`
  )
    .then((d) => d.json())
    .then((d) => d.map((el) => el.name));
  return api_data;
}

const searchEl = document.querySelector(".search-input");
const searchBoxEls = document.querySelector(".search-option-box");

async function typingHint(e) {
  const hints = await typying_options(e.target.value);
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