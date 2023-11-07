import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return the temperature for a valid city name", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "New York" });

    expect(response.status).toBe(200);
    expect(response.body.weatherText).toMatch(/Weather in New York:/);
    expect(response.body.weatherText).toMatch(/\d+°C/);
  });

  it("should return a 404 status code for an invalid or non-existent city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "InvalidCityName" });

    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return a 400 status code when cityName is missing", async () => {
    const response = await request.post("/weather");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("City name is required");
  });
});
