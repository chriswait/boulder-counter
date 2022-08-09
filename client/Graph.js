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
import Panel from "./Panel";

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

const Graph = ({ graph }) => {
  return (
    <Panel>
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
        data={graph}
      />
    </Panel>
  );
};

export default Graph;
