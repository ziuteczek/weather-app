"use strict";
const unitBtn = document.querySelector(".unit-btn");
let unit = "C";
unitBtn.addEventListener("click", (e) => {
  unit = unit === "C" ? "F" : "C";
  e.target.textContent = `°${unit}`;
});
