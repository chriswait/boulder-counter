import sqlite3 from "sqlite3";
import { open } from "sqlite";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3234;

const hourIndexes = [...Array(24).keys()];
const dayIndexes = [...Array(7).keys()];
const stats = {
  hours: hourIndexes.reduce(
    (acc, hourIndex) => ({
      ...acc,
      [hourIndex]: [],
    }),
    {}
  ),
  days: dayIndexes.reduce(
    (acc, dayIndex) => ({
      ...acc,
      [dayIndex]: [],
    }),
    {}
  ),
};

app.get("/api", async (req, res) => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  const results = await db.all("SELECT * FROM Logs");
  const resultStats = results.reduce((acc, result) => {
    const date = new Date(result.when);
    const [hour, day] = [date.getHours(), date.getDay()];
    return {
      days: {
        ...acc.days,
        [day]: [...acc.days[day], result],
      },
      hours: {
        ...acc.hours,
        [hour]: [...acc.hours[hour], result],
      },
    };
  }, stats);
  res.json({ log: results, resultStats });
});

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
