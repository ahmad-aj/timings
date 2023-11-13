import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography } from "@mui/material";

function PrayerTimings() {
  const [prayerTimings, setPrayerTimings] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/prayer-timings")
      .then((response) => {
        setPrayerTimings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching prayer timings:", error);
      });
  }, []);

  const convertTimestampToEST = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", { timeZone: "America/New_York" });
  };

  return (
    <div style={{ padding: "16px" }}>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Prayer Timings in EST
        </Typography>
        {prayerTimings && prayerTimings.multiDayTimings.length > 0 ? (
          <div>
            {prayerTimings.multiDayTimings[0].prayers
              .filter((prayer) => prayer.name !== "Sunrise" && prayer.name !== "Sunset")
              .map((prayer, index) => (
                <div key={index}>
                  <Typography variant="body1">
                    {prayer.name}: {convertTimestampToEST(prayer.time)}
                  </Typography>
                </div>
              ))}
          </div>
        ) : (
          <Typography variant="body1">Loading prayer timings...</Typography>
        )}
      </Paper>
    </div>
  );
}

export default PrayerTimings;
