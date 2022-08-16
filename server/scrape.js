import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
const fsPromises = fs.promises;

import { computeGraphDataForLog, computeStatsForLog } from "./util.js";

(async () => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  await db.migrate();

  const response = await fetch(
    "https://portal.rockgympro.com/portal/public/620b59568a6c93407373bda88564f747/occupancy"
  );
  const body = await response.text();
  const count = body.match(/'count' : (?<count>\d+),/).groups.count;
  const capacity = body.match(/'capacity' : (?<capacity>\d+),/).groups.capacity;
  db.exec(
    `insert into Logs values ("${new Date().toISOString()}", ${count}, ${capacity})`
  );

  const log = await db.all("SELECT * FROM Logs");
  const stats = computeStatsForLog(log);
  await fsPromises.writeFile("stats.json", JSON.stringify(stats));

  const LAST_WEEK = new Date();
  const LAST_WEEK_DATE = LAST_WEEK.getDate() - 7;
  LAST_WEEK.setDate(LAST_WEEK_DATE);
  const weekLog = await db.all(
    `SELECT * FROM Logs where "when" > "${LAST_WEEK.toISOString()}"`
  );
  const graph = computeGraphDataForLog(weekLog);
  await fsPromises.writeFile("graph.json", JSON.stringify(graph));
})();
