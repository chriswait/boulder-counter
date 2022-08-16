import express from "express";
import cors from "cors";
import fs from "fs";
const fsPromises = fs.promises;
import { fetchMostRecent, isOpen } from "./util.js";

const app = express();
app.use(cors());
const port = 3234;

app.get("/api", async (req, res) => {
  const graphBuffer = await fsPromises.readFile("graph.json");
  const graph = JSON.parse(graphBuffer);
  const statsBuffer = await fsPromises.readFile("stats.json");
  const stats = JSON.parse(statsBuffer);
  const eventsBuffer = await fsPromises.readFile("events.json");
  const events = JSON.parse(eventsBuffer);
  const mostRecentLog = await fetchMostRecent();
  const open = isOpen();
  res.json({ graph, stats, mostRecentLog, events, open });
});

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
