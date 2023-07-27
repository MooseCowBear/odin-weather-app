import { drawComponent } from "./weather-component";
import { drawError } from "./error-component";

const KEY = '4df08516d90744c0a6a204434232607';

export async function getForecast(input, fahrenheit = true) { 
  const numDays = 2;

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${input}&days=${numDays}`);
    const data = await response.json();
    drawComponent(data, fahrenheit); 

  } catch(e) {
    console.log(e);
    drawError();
  }
}