import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

function heatMapColorforValue(value) {
  var h = (1.0 - value) * 240;
  return "hsl(" + h + ", 80%, 70%)";
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const status = mostRecentLog
    ? mostRecentLog.count > 110
      ? "Whoa that's super busy."
      : mostRecentLog.count > 80
      ? "That's pretty busy."
      : mostRecentLog.count > 50
      ? "That's about average."
      : mostRecentLog.count > 20
      ? "That's pretty quiet."
      : mostRecentLog.count > 0
      ? "That's basically empty."
      : "There's literally nobody there."
    : "";
  return (
    <>
      {mostRecentLog ? (
        <div style={{ fontSize: 18, textAlign: "center" }}>
          <div>There's about </div>
          <div style={{ fontSize: 32 }}>{mostRecentLog.count}</div>
          <div>people climbing right now</div>
          <p>{status}</p>
        </div>
      ) : null}
      {log ? (
        <div>
          <Line
            options={{
              animations: false,
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  stacked: false,
                },
                x: {
                  type: "time",
                  time: {
                    unit: "hour",
                  },
                },
              },
            }}
            data={{
              labels: log.map((entry) => {
                const date = new Date(entry.when);
                return date;
              }),
              datasets: [
                {
                  label: "count",
                  data: log.map((entry) => entry.count),
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </div>
      ) : (
        "No data"
      )}
      {stats && (
        <div
          style={{
            display: "flex",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              padding: "10px 0px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>&nbsp;</div>
            {[...Array(24).keys()]
              .filter((hour) => hour >= 6 && hour <= 22)
              .map((hour) => (
                <div key={hour}>
                  {hour % 12 || 12}
                  {hour < 12 || hour === 24 ? "am" : "pm"}
                </div>
              ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${
                Object.keys(stats.days).length + 1
              }, 1fr)`,
              textAlign: "center",
              gridGap: 5,
              overflowX: "scroll",
            }}
          >
            {Object.entries(stats.days).map(([dayIndex, { name, hours }]) => (
              <div
                key={dayIndex}
                style={{
                  borderRight: "2px solid lightgrey",
                  padding: 10,
                }}
              >
                <div style={{ fontWeight: "bold" }}>{name}</div>
                {Object.entries(hours)
                  .filter(([hourIndex]) => hourIndex >= 6 && hourIndex <= 22)
                  .map(([hourIndex, { average, counts }]) => (
                    <div
                      key={hourIndex}
                      style={{
                        backgroundColor: average
                          ? heatMapColorforValue(average / 150)
                          : undefined,
                      }}
                    >
                      {counts.length === 0 ? "-" : average}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
