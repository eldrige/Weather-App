// check if your not running on production, then configure your environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const API_KEY = process.env.OPENWEATHER_API_KEY;
// populate the api_key var, with your api key details

const express = require("express");
const axios = require("axios");
// axios works similarly to fetch

const app = express();

app.use(express.json());
// set up express to use json, since we will be making api calls
app.use(express.static("public"));
// set express to know where your static folders are found
// that is our html will be served from here

app.post("/weather", (req, res) => {
  const url = ` https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${API_KEY}`;
  axios({
    url : url,
    responseType: 'json'
  }).then(data => res.json(data)) // this will send a json version of our data, back to the script.js
  // console.log(req.body);
});

app.listen(3000, () => {
  console.log("server started");
});

// {"coord": { "lon": 139,"lat": 35},
//   "weather": [
//     {
//       "id": 800,
//       "main": "Clear",
//       "description": "clear sky",
//       "icon": "01n"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 281.52,
//     "feels_like": 278.99,
//     "temp_min": 280.15,
//     "temp_max": 283.71,
//     "pressure": 1016,
//     "humidity": 93
//   },
//   "wind": {
//     "speed": 0.47,
//     "deg": 107.538
//   },
//   "clouds": {
//     "all": 2
//   },
//   "dt": 1560350192,
//   "sys": {
//     "type": 3,
//     "id": 2019346,
//     "message": 0.0065,
//     "country": "JP",
//     "sunrise": 1560281377,
//     "sunset": 1560333478
//   },
//   "timezone": 32400,
//   "id": 1851632,
//   "name": "Shuzenji",
//   "cod": 200
// }
