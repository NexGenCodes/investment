import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  CategoryScale,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  CategoryScale
);

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#fff",
        boxWidth: 12, // Smaller legend box
        usePointStyle: true, // Make it a dot instead of a box
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw as number;
          return `Price: $${value.toFixed(2)}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: { display: true, color: "rgba(255, 255, 255, 0.1)" },
      ticks: { color: "#fff" },
    },
    x: {
      grid: { display: false },
      ticks: { color: "#fff" },
    },
  },
};

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    pointRadius: number;
    pointBackgroundColor: string;
  }[];
}

const timeframes = ["1D", "1W", "1M", "1Y"];

const LiveInvestmentChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        borderColor: "rgba(0, 255, 255, 1)",
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        borderWidth: 2.5, // Thicker line for better visibility
        pointRadius: 4, // Make points more visible
        pointBackgroundColor: "rgba(0, 255, 255, 1)", // Match line color
      },
    ],
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  useEffect(() => {
    const sampleLabels: string[] = [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
    ];
    const sampleData: number[] = [70.5, 69.5, 69.0, 70.0, 70.5, 70.48];

    setChartData({
      labels: sampleLabels,
      datasets: [
        {
          label: "Price",
          data: sampleData,
          borderColor: "rgba(0, 255, 255, 1)",
          backgroundColor: "rgba(0, 255, 255, 0.2)",
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: "rgba(0, 255, 255, 1)",
        },
      ],
    });
  }, [selectedTimeframe]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-screen-lg mx-auto w-full p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700"
    >
      {/* Header and Timeframe Selector */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-semibold text-white">Investment Performance</h2>
        <div className="flex flex-wrap gap-2">
          {timeframes.map((time) => (
            <button
              key={time}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-300 border border-blue-400 ${
                selectedTimeframe === time
                  ? "bg-blue-400 text-gray-900"
                  : "text-blue-400 hover:bg-blue-400/20"
              }`}
              onClick={() => setSelectedTimeframe(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

     {/* Chart Container */}
<div className="relative w-full mt-4 h-[300px] md:h-[350px] lg:h-[400px] bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent opacity-25"></div>
  <Line options={options} data={chartData} />
</div>

    </motion.div>
  );
};

export default LiveInvestmentChart;
