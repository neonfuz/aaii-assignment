export function getStocks() {
  return fetch('/stocks.json')
    .then(response => response.json())
    .then(data => data.screenRating);
}
