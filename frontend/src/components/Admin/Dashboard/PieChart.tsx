import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, TooltipItem } from "chart.js";

Chart.register(ArcElement);

export default function PieChart() {
  const data = {
    labels: ["Processing", "Delevered", "Canceled"],
    datasets: [
      {
        data: [8, 20, 2],
        backgroundColor: ["blue", "orange", "yellow"],
      },
    ],
  };

  const options = {
    cutout: 100,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            if (context.dataset) {
              const label = context.label;
              const value = context.parsed;
              return `${label}: ${value}`;
            }
            return "";
          },
        },
      },
    },
  };

  return <Pie className="drop-shadow-lg" data={data} options={options} />;
}
