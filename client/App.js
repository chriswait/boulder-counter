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
  const [log, setLog] = useState([]);
  useEffect(() => {
    const init = async () => {
      const result = await fetch("/api");
      setLog(await result.json());
    };
    init();
    const interval = setInterval(async () => {
      const result = await fetch("/api");
      setLog(await result.json());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  return log.length > 0 ? (
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
  );
};

export default App;
