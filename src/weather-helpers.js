export function temperature(dataObj, fahrenheit) {
  return fahrenheit ? dataObj.temp_f : dataObj.temp_c; 
}

export function feelsLike(dataObj, fahrenheit) {
  return fahrenheit ? dataObj.feelslike_f : dataObj.feelslike_c; 
}

export function condition(dataObj) {
  return dataObj.condition.text;
}

export function uv(dataObj) {
  return dataObj.uv;
}

export function visibility(dataObj) {
  return dataObj.vis_miles;
}

export function humidity(dataObj) {
  return dataObj.humidity;
}

export function pressure(dataObj) {
  return dataObj.pressure_in;
}

export function wind(dataObj) {
  return dataObj.wind_mph;
}

export function currHour(dataObj) {
  const len = dataObj.location.localtime.length;
  return parseInt(dataObj.location.localtime.slice(len - 5, len - 3));
}

export function next24Hours(dataObj, fahrenheit) {
  /* 
    function for getting all of the information
    needed to display the next twenty-four hours worth
    of weather data
  */
  const hours = [];
  const temps = [];
  const icons = [];

  const curr = currHour(dataObj);

  for (let i = curr; i < 24; i ++) {
    hours.push(i); //index is hour
    temps.push(temperature(dataObj.forecast.forecastday[0].hour[i], fahrenheit));
    icons.push(icon(dataObj.forecast.forecastday[0].hour[i]));
  }
  
  let j = 0;
  while (hours.length < 24) {
    hours.push(j);
    temps.push(temperature(dataObj.forecast.forecastday[1].hour[j], fahrenheit));
    icons.push(icon(dataObj.forecast.forecastday[1].hour[j]));
    j++;
  }

  return {
    hours: hours,
    temps: temps,
    icons: icons
  }
}

export function location(dataObj) {
  return dataObj.location.name;
}

export function highTemp(dataObj, fahrenheit) {
  return fahrenheit ? dataObj.forecast.forecastday[0].day.maxtemp_f : dataObj.forecast.forecastday[0].day.maxtemp_c;
}

export function lowTemp(dataObj, fahrenheit) {
  return fahrenheit ? dataObj.forecast.forecastday[0].day.mintemp_f : dataObj.forecast.forecastday[0].day.mintemp_c;
}

export function precipitation(dataObj) {
  return dataObj.precip_in;
}

function icon(dataObj) {
  let daytime = dataObj.is_day;
  let icon = dataObj.condition.icon;
  icon = icon.substr(icon.length - 7);

  return [daytime, icon];
}