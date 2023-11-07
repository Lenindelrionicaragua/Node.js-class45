import express from "express";
import fetch from "node-fetch";

import keys from "./sources/keys.js";

// Create an Express instance
const app = express();
app.use(express.json()); // Parse JSON data in the request body

// Define a POST route with the endpoint "/weather"
app.post("/weather", async (req, res) => {
  // Access the "cityName" property from the request body
  const cityName = req.body.cityName;

  //Check if citiName is provided
  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    // Make a request to the OpenWeatherMap API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`
    );

    if (response.status === 404) {
      // City not found
      res.status(404).json({ weatherText: "City is not found!" });
    } else {
      // City found, parse the response data
      const data = await response.json();
      const weatherText = `Weather in ${data.name}: ${data.main.temp}°C`;
      res.json({ weatherText });
    }
  } catch (error) {
    // Handle any errors from the API request
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

export default app;
