import { useEffect, useState } from "react";

import Status from "./Status";
import Graph from "./Graph";
import Table from "./Table";
import RouteSettingsEvents from "./RouteSettingsEvents";
import { stroke } from "./util";

const App = () => {
  const [graph, setGraph] = useState();
  const [mostRecentLog, setMostRecentLog] = useState();
  const [stats, setStats] = useState();
  const [isOpen, setIsOpen] = useState();
  const [events, setEvents] = useState();
  useEffect(() => {
    const init = async () => {
      // const result = await fetch("https://boulder.chriswait.net/api");
      const result = await fetch("/api");
      const {
        graph: newGraph,
        stats: newStats,
        mostRecentLog: newMostRecentLog,
        open: newIsOpen,
        events: newEvents,
      } = await result.json();
      setGraph(newGraph);
      setStats(newStats);
      setMostRecentLog(newMostRecentLog);
      setIsOpen(newIsOpen);
      setEvents(newEvents);
    };
    init();
    const interval = setInterval(async () => {
      init();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  const date = new Date();
  const [hour, day] = [date.getUTCHours(), date.getDay()];
  const currentStat = stats ? stats.days[day].hours[hour] : undefined;
  return (
    <div
      style={{
        color: stroke,
      }}
    >
      {!graph ? (
        <div>Loading</div>
      ) : (
        <div className="container" style={{ marginTop: 30 }}>
          {mostRecentLog ? (
            <Status
              isOpen={isOpen}
              mostRecentLog={mostRecentLog}
              currentStat={currentStat}
              currentDay={day}
              currentHour={hour}
            />
          ) : null}
          {graph ? <Graph graph={graph} /> : "No data"}
          {stats ? (
            <Table stats={stats} currentDay={day} currentHour={hour} />
          ) : (
            "No status"
          )}
          {events ? <RouteSettingsEvents events={events} /> : "No status"}
        </div>
      )}
    </div>
  );
};

export default App;
