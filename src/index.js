import './style.css';
import { getForecast } from './weather-service';
import { updateDegreeDisplay, updateDegreeBtn } from './update-degrees';

let fahrenheit = true;

(function () {
  getForecast('new york', fahrenheit);

  const changeDegreesBtn = document.getElementById('degree-type');
  changeDegreesBtn.addEventListener('click', () => {
    fahrenheit = !fahrenheit;
    updateDegreeDisplay(fahrenheit);
    updateDegreeBtn(changeDegreesBtn, fahrenheit);
  });

  const searchBtn = document.querySelector('input[type="submit"]');
  searchBtn.addEventListener('click', () => {
    const formInput = document.querySelector('input[type="text"]').value;
    getForecast(formInput, fahrenheit);
  });
})();
