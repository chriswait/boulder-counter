import { useEffect, useState } from "react";

import Status from "./Status";
import Graph from "./Graph";
import Table from "./Table";

const App = () => {
  const [log, setLog] = useState();
  const [stats, setStats] = useState();
  useEffect(() => {
    const init = async () => {
      const result = await fetch("https://boulder.chriswait.net/api");
      const { log: newLog, stats: newStats } = await result.json();
      setLog(newLog);
      setStats(newStats);
    };
    init();
    const interval = setInterval(async () => {
      init();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  const mostRecentLog = log ? log[log.length - 1] : undefined;
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        color: "#32308e",
      }}
    >
      {!log ? (
        <div>Loading</div>
      ) : (
        <div className="container" style={{ marginTop: 30 }}>
          {mostRecentLog ? <Status mostRecentLog={mostRecentLog} /> : null}
          {log ? <Graph log={log} /> : "No data"}
          {stats ? <Table stats={stats} /> : "No status"}
        </div>
      )}
    </div>
  );
};

export default App;
