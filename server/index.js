import sqlite3 from "sqlite3";
import { open } from "sqlite";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3234;

const hourIndexes = [...Array(24).keys()];
const dayIndexes = [...Array(7).keys()];
const statsTemplate = () => ({
  days: dayIndexes.reduce(
    (acc, dayIndex) => ({
      ...acc,
      [dayIndex]: {
        name: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wedneday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayIndex],
        hours: hourIndexes.reduce(
          (acc, hourIndex) => ({
            ...acc,
            [hourIndex]: { counts: [] },
          }),
          {}
        ),
      },
    }),
    {}
  ),
});

app.get("/api", async (req, res) => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  const results = await db.all("SELECT * FROM Logs");
  const stats = statsTemplate();
  // split counts into days, then hours
  results.map(({ when, count }) => {
    const date = new Date(when);
    const [hour, day] = [date.getHours(), date.getDay()];
    stats.days[day].hours[hour].counts.push(count);
  });
  // compute averages
  Object.entries(stats.days).map(([day, { hours }]) => {
    Object.entries(hours).map(([hour, { counts }]) => {
      const averageCount =
        counts.reduce((acc, count) => acc + count, 0) / counts.length;
      stats.days[day].hours[hour].average = Math.round(averageCount);
    });
  });
  res.json({ log: results, stats });
});

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
