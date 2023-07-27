import { addElement, addImage } from "./view-helpers";
import * as Weather from "./weather-helpers"

function importAll(r) {
  let images = {};
  r.keys().map((item, ) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const dayIcons = importAll(require.context('./weather_icons/day', false, /\.(png)$/));
const nightIcons = importAll(require.context('./weather_icons/night', false, /\.(png)$/));

export function drawComponent(data, fahrenheit) {
  const parent = document.getElementById("content");
  parent.textContent = "";

  drawMainTempDisplay(parent, data, fahrenheit);
  drawHourlyForecast(parent, data, fahrenheit);
  drawMoreInfoDisplay(parent, data, fahrenheit);
}

function drawMainTempDisplay(parent, data, fahrenheit) {
  const mainTemperatureContainer = addElement('div', parent, ['hero']);
  addElement('p', mainTemperatureContainer, [], Weather.location(data));
  addElement('h1', mainTemperatureContainer, ['temp'], tempString(Weather.temperature(data.current, fahrenheit)));
  addElement('p', mainTemperatureContainer, [], Weather.condition(data.current));

  const highLowWrapper = addElement('div', mainTemperatureContainer, []);
  const high = addElement('p', highLowWrapper, [], "H:");
  addElement('span', high, ['temp'], tempString(Weather.highTemp(data, fahrenheit)));
  const low = addElement('p', highLowWrapper, [], "L:");
  addElement('span', low, ['temp'], tempString(Weather.lowTemp(data, fahrenheit)));
}

function drawHourlyForecast(parent, data, fahrenheit) {
  const hourlyContainer = addElement('div', parent, ['hourly']);

  const hourlyData = Weather.next24Hours(data, fahrenheit);

  for (let i = 0; i < 24; i ++ ){
    const hourDiv = addElement('div', hourlyContainer, []);
    addElement('p', hourDiv, [], hourString(hourlyData.hours[i])); 

    if (hourlyData.icons[i][0] === 1) {
      addImage(dayIcons[hourlyData.icons[i][1]], hourDiv, ['icon']);
    } else {
      addImage(nightIcons[hourlyData.icons[i][1]], hourDiv, ['icon']);
    }
    addElement('p', hourDiv, [], tempString(hourlyData.temps[i])); 
  }
}

function drawMoreInfoDisplay(parent, data, fahrenheit) {
  const moreInfoContainer = addElement('div', parent, ['more-info']);

  const uvIndex = addElement('div', moreInfoContainer, []);
  addElement('h3', uvIndex, [], "UV Index");
  addElement('p', uvIndex, [], Weather.uv(data.current));

  //sunrise or sunset?
  const sun = addElement('div', moreInfoContainer, []);
  createSunDiv(data, sun);

  const windSpeed = addElement('div', moreInfoContainer, []);
  addElement('h3', windSpeed, [], "Wind");
  addElement('p', windSpeed, [], Weather.wind(data.current));

  const precip = addElement('div', moreInfoContainer, []);
  addElement('h3', precip, [], "Precipitation");
  addElement('p', precip, [], Weather.precipitation(data.current));

  const feels = addElement('div', moreInfoContainer, []);
  addElement('h3', feels, [], "Feels Like");
  addElement('p', feels, [], tempString(Weather.feelsLike(data.current, fahrenheit)));

  const humidityLevel = addElement('div', moreInfoContainer, []);
  addElement('h3', humidityLevel, [], "Humidity");
  addElement('p', humidityLevel, [], Weather.humidity(data.current));

  const pressureLevel = addElement('div', moreInfoContainer, []);
  addElement('h3', pressureLevel, [], "Pressure (hgIn)");
  addElement('p', pressureLevel, [], Weather.pressure(data.current));

  const vis = addElement('div', moreInfoContainer, []);
  addElement('h3', vis, [], "Visibility (miles)");
  addElement('p', vis, [], Weather.visibility(data.current));
}

function createSunDiv(data, parent) {
  if (data.current.is_day === 1) {
    addElement('h3', parent, [], "Sunset");
    addElement('p', parent, ['sun'], data.forecast.forecastday[0].astro.sunset);
  } else {
    addElement('h3', parent, [], "Sunrise"); 
    addElement('p', parent, ['sun'], data.forecast.forecastday[1].astro.sunrise);
  }
}

function hourString(hour) {
  if (hour === 0) {
    return "12 am";
  } else if (hour === 12) {
    return "12 pm";
  } else if (hour > 12) {
    return `${hour - 12} pm`;
  } else {
    return `${hour} am`;
  }
}

function tempString(temp) {
  return `${temp} \u00B0`;
}