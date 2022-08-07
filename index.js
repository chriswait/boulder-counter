import sqlite3 from "sqlite3";
import { open } from "sqlite";
import express from "express";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  const result = await db.all("SELECT * FROM Logs");
  res.json({ log: result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
