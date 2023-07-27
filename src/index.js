import "./style.css";
import { getForecast } from "./weather-service";
import { updateDegreeDisplay, updateDegreeBtn } from "./update-degrees";

let fahrenheit = true;

(function () {
  getForecast("new york", fahrenheit);

  const changeDegreesBtn = document.getElementById("degree-type");
  console.log("button", changeDegreesBtn);
  changeDegreesBtn.addEventListener("click", () => {
    console.log("change degrees");
    fahrenheit = !fahrenheit;
    console.log("f", fahrenheit);
    
    updateDegreeDisplay(fahrenheit);
    updateDegreeBtn(changeDegreesBtn, fahrenheit);
  });

  //need to add listener/handler for form submit.
})();