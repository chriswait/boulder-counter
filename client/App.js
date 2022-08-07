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
      const result = await fetch("/api");
      const { log: newLog, stats: newStats } = await result.json();
      setLog(newLog);
      setStats(newStats);
      console.log(newLog, newStats);
    };
    init();
    const interval = setInterval(async () => {
      init();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {log ? (
        <div>
          <Line
            options={{
              animations: false,
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: "top",
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
            display: "grid",
            gridTemplateColumns: `repeat(${
              Object.keys(stats.days).length + 1
            }, 1fr)`,
          }}
        >
          <div>
            <div>day/hour</div>
            {[...Array(24).keys()].map((_, index) => (
              <div key={index}>{index}</div>
            ))}
          </div>
          {Object.entries(stats.days).map(([dayIndex, { name, hours }]) => (
            <div key={dayIndex}>
              {name}
              {Object.entries(hours).map(([hourIndex, { average, counts }]) => (
                <div key={hourIndex}>{counts.length === 0 ? "-" : average}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
