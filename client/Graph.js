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

const Graph = ({ log }) => {
  // let's not draw everything
  const points = [];
  for (var i = 0; i < log.length; i = i + 10) {
    points.push(log[i]);
  }
  return (
    <div>
      <Line
        options={{
          animations: false,
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            point: {
              radius: 0,
            },
            line: {
              borderColor: "#32308e",
            },
          },
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
          labels: points.map((entry) => {
            const date = new Date(entry.when);
            return date;
          }),
          datasets: [
            {
              label: "count",
              data: points.map((entry) => entry.count),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
