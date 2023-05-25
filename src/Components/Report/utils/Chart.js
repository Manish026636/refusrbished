import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ data }) {
  const value = {
    labels: [data?.labels[0], data?.labels[1]],
    datasets: [
      {
        label: "no of delegates",
        data: [data?.val[0], data?.val[1]],
        backgroundColor: ["rgba(37, 218, 38, 0.8)", "rgba(51, 141, 193, 0.8)"],
        borderColor: ["rgba(0, 255, 2, 0.8)", "rgba(17, 154, 231, 0.8)"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={value} />;
}
