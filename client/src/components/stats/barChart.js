import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

import "./css/barChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Daily Reportings",
    },
  },
};

const labels = [
  "24 Nov",
  "25 Nov",
  "26 Nov",
  "27 Nov",
  "28 Nov",
  "29 Nov",
  "30 Nov",
];

const data = {
  labels,
  datasets: [
    {
      label: "Flora",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Fauna",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function BarChart() {
  return (
    <div className='barContainer'>
      <Bar options={options} data={data} />
    </div>
  );
}

export default BarChart;
