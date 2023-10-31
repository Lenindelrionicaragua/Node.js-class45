import express from "express";

// Create an Express instance
const app = express();
app.use(express.json()); //parse JSON data in the request body

// Define a POST route with the endpoint "/weather"
app.post("/weather", (req, res) => {
  // Access the "cityName" property from the request body
  const cityName = req.body.cityName;

  //Check if citiNam is provided
  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }

  res.json({ cityName: cityName });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
