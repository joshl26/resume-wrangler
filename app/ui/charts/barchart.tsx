"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

function BarChart() {
  useEffect(() => {
    // 1. Declare chart var in scope accessible to cleanup
    let myChart: Chart | undefined;

    const canvas2 = document?.getElementById("myChart3");
    const ctx = (canvas2 as HTMLCanvasElement)?.getContext("2d");

    if (ctx) {
      // 2. Assign to the outer var
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          datasets: [
            {
              data: [4, 10, 4, 7, 6, 3, 1],
              label: "Open",
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderWidth: 2,
            },
            {
              data: [2, 2, 5, 3, 3, 2, 1],
              label: "Pending",
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgba(255, 205, 86, 0.5)",
              borderWidth: 2,
            },
            {
              data: [0, 2, 5, 1, 1, 7, 0],
              label: "Closed",
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderWidth: 2,
            },
          ],
        },
      });
    }

    // 3. Cleanup references the outer var
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  return (
    <div className="w-[500px] h-[200px] flex flex-row ml-20">
      <canvas id="myChart3"></canvas>
    </div>
  );
}

export default BarChart;
