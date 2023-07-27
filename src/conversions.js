export function celsiusToFahrenheit(deg) {
  return (deg * 9/5 + 32).toFixed(1);
}

export function fahrenheitToCelsius(deg) {
  return ((deg - 32) * 5/9).toFixed(1);
}