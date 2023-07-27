import { celsiusToFahrenheit, fahrenheitToCelsius } from "./conversions";
import { tempString } from "./view-helpers";

export function updateDegreeDisplay(fahrenheit) {
  const elems = document.querySelectorAll('.temp');

  elems.forEach((elem) => {
    const temp = elem.textContent.slice(0, -1);
    console.log(temp);
    const newTemp = fahrenheit ? celsiusToFahrenheit(parseFloat(temp)) : fahrenheitToCelsius(parseFloat(temp));
    elem.textContent = tempString(newTemp);
  });
}

export function updateDegreeBtn(btn, fahrenheit) {
  btn.textContent = fahrenheit ? "F" : "C";
}