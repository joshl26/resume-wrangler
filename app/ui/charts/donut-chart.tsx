"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

function DonutChart() {
  useEffect(() => {
    const canvas3 = document?.getElementById("myChart4");
    const ctx = (canvas3 as HTMLCanvasElement)?.getContext("2d");

    if (ctx) {
      var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Accepted", "Pending", "Rejected"],
          datasets: [
            {
              data: [70, 10, 6],
              borderColor: [
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ],
              backgroundColor: [
                "rgb(75, 192, 192 )",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            xAxes: {
              display: false,
            },

            yAxes: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      myChart.destroy();
    };
  }, []);
  return (
    <div className="absolute px-14 t-0 w-auto h-[200px]">
      <canvas id="myChart4"></canvas>
    </div>
  );
}

export default DonutChart;
