import express from "express";
import cors from "cors";
import fs from "fs";
const fsPromises = fs.promises;
import { fetchAll } from "./util.js";

const app = express();
app.use(cors());
const port = 3234;

app.get("/api", async (req, res) => {
  const log = await fetchAll();
  const statsBuffer = await fsPromises.readFile("stats.json");
  const stats = JSON.parse(statsBuffer);
  res.json({ log, stats });
});

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
