import React from "react";
import { Bar } from "react-chartjs-2";

function BMIChart({ bmi }) {
  const data = {
    labels: ["Underweight", "Normal", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI Categories",
        data: [18.5, 24.9, 29.9, 35],
        backgroundColor: ["blue", "green", "orange", "red"],
      },
    ],
  };

  return <Bar data={data} />;
}

export default BMIChart;
