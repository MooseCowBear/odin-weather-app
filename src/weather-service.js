const KEY = '4df08516d90744c0a6a204434232607';

//example of getting 2 day forecast (includes current) of city + air qual + alerts
//const example = "https://api.weatherapi.com/v1/forecast.json?key=4df08516d90744c0a6a204434232607&q=new york&days=2&aqi=yes&alerts=yes"

//example of autocomplete search
//https://api.weatherapi.com/v1/search.json?key=4df08516d90744c0a6a204434232607&q=new y

export async function getForecast(input) {
  const numDays = 2;

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${input}&days=${numDays}`);
    const data = await response.json();
    console.log(data);
  } catch(e) {
    //handle error
    console.log(e);
  }
}