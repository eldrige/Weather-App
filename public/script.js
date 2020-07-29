// select input form
const searchElement = document.querySelector("[data-city-search]");
// create seacrhBox generated from google places api
const searchBox = new google.maps.places.SearchBox(searchElement);
// add listener is a google maps stuff, not js

// whwnever our search box has a place selected inside of it, this code will be executed
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0]; // select first place
  if (place == null) return; // make sure it is null
  const latitude = place.geometry.location.lat(); // similar to nav.geo in plain JS
  const longitude = place.geometry.location.lon();

  // using this info, our data will be posted to our server, and fetch will actually fetch that data
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application.json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  }).then( response => response.json()).then( data => {
      setWeatherData(data, place.formatted_address)
  });
});
