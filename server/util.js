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

export const fetchMostRecent = async () => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  const result = await db.get(
    "SELECT * FROM Logs ORDER BY rowid DESC LIMIT 1;"
  );
  return result;
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

export const computeGraphDataForLog = (log) => {
  // let's not draw everything...
  const points = [];
  for (var i = 0; i < log.length; i = i + 10) {
    points.push(log[i]);
  }
  const labels = points.map((entry) => {
    const date = new Date(entry.when);
    return date;
  });
  const datasets = [
    {
      label: "count",
      data: points.map((entry) => entry.count),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];
  return {
    labels,
    datasets,
  };
};

export const isOpen = () => {
  let dateString = new Date().toLocaleString("en-US", {
    timeZone: "Europe/London",
  });
  let date = new Date(dateString);
  const [hour, day] = [date.getHours(), date.getDay()];
  if ([0, 1, 3, 5, 6].includes(day)) {
    return hour >= 8 && hour < 22;
  } else {
    // tuesdays and thursdays
    return hour >= 6 && hour < 22;
  }
};
