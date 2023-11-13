const express = require("express");
const axios = require("axios");



const app = express();
const port = 3001; // backend server pot
var cors = require('cors');
app.use(cors());

app.use(express.json());

app.get("/api/prayer-timings", async (req, res) => {
  try {
    const response = await axios.get("https://alislam.org/adhan/api/timings/day");
    const prayerTimings = response.data;

    res.json(prayerTimings);
  } catch (error) {
    console.error("Error fetching prayer timings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
