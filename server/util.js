import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const fetchAll = async () => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  const results = await db.all("SELECT * FROM Logs");
  return results;
};

const hourIndexes = [...Array(24).keys()];
const dayIndexes = [...Array(7).keys()];

const getStatsTemplate = () => ({
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

export const computeStatsForLog = (log) => {
  const stats = getStatsTemplate();
  // split counts into days, then hours
  log.map(({ when, count }) => {
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
      delete stats.days[day].hours[hour].counts;
    });
  });
  return stats;
};
