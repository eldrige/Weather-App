// check if your not running on production, then configure your environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const API_kEY = process.env.OPENWEATHER_API_KEY;
// populate the api_key var, with your api key details

const express = require("express");

const app = express();

app.use(express.json());
// set up express to use json, since we will be making api calls
app.use(express.static("public"));
// set express to know where your static folders are found
// that is our html will be served from here

app.post("/weather", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("server started");
});
