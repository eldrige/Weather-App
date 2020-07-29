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
  const longitude = place.geometry.location.lng();

  // using this info, our data will be posted to our server, and fetch will actually fetch that data
  fetch("/weather", {
    method: "POST", // to match the post we setup in our server.js express
    headers: {
      "Content-Type": "application/json", // we our sending json to the server
      Accept: "application.json", // we will be retrieving json form the server
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }), // send this to our server
    // all of the above data is posted to our sever
  })
    .then((response) => response.json()) // convert our data to json
    .then((data) => {
      setWeatherData(data, place.formatted_address); //from the places api
      console.log(data);
    })
    .catch((err) => console.log(`an error occured: ${err}`));
});

const locationElt = document.querySelector("[data-location]");
const statusElt = document.querySelector("[data-status]");
const temperatureElt = document.querySelector("[data-temperature]");
const precipitationElt = document.querySelector("[data-precipitation]");
const windElt = document.querySelector("[data-wind]");

function setWeatherData(data, place) {
  locationElt.textContent = place;
  statusElt.textContent = data.weather[0].description;
  temperatureElt.textContent = data.main.temp;
  precipitationElt.textContent = data.main.humidity;
}
