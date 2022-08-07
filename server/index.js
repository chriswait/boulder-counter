import sqlite3 from "sqlite3";
import { open } from "sqlite";
import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3234;

app.get("/api", async (req, res) => {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  const result = await db.all("SELECT * FROM Logs");
  res.json(result);
});

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
