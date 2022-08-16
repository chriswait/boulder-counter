import ical from "ical";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
const fsPromises = fs.promises;

(async () => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  await db.migrate();

  const response = await fetch(
    "https://tockify.com/api/feeds/ics/routesetting"
  );
  const body = await response.text();
  const data = ical.parseICS(body);
  Object.values(data).map((event) => {
    const { summary, start, type, uid, description } = event;
    if (type == "VEVENT") {
      db.exec(
        `replace into RouteSettingEvents ('uid', 'when', 'summary', 'description') values ("${uid}", "${start.toISOString()}", "${summary}", "${description}");`
      );
    }
  });
  const NOW = new Date();
  const TWO_MONTHS = new Date(NOW.getTime());
  TWO_MONTHS.setMonth(TWO_MONTHS.getMonth() + 2);
  const futureEvents = await db.all(
    `SELECT * FROM RouteSettingEvents WHERE "when" > "${NOW.toISOString()}" AND "when" < "${TWO_MONTHS.toISOString()}";`
  );
  await fsPromises.writeFile("events.json", JSON.stringify(futureEvents));
})();
