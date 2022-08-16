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
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import Panel from "./Panel";
import { stroke } from "./util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
              borderColor: stroke,
              fill: {
                target: "origin",
                above: stroke,
              },
            },
          },
          interaction: {
            mode: "index",
          },
          plugins: {
            legend: {
              position: false,
            },
            tooltip: {
              intersect: false,
              xAlign: "center",
              yAlign: "bottom",
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                tooltipFormat: "HH:mm",
                unit: "day",
                displayFormats: {
                  day: "E",
                },
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
