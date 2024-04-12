"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

function BarChart() {
  useEffect(() => {
    const canvas2 = document?.getElementById("myChart3");
    const ctx = (canvas2 as HTMLCanvasElement)?.getContext("2d");

    if (ctx) {
      var myChart = new Chart(ctx, {
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
            // {
            //   data: [6, 14, 14, 11, 10, 13, 4],
            //   label: "All",
            //   borderColor: "rgb(109, 253, 181)",
            //   backgroundColor: "rgb(109, 253, 181,0.5)",
            //   borderWidth: 2,
            // },
            {
              data: [4, 10, 4, 7, 6, 3, 1],
              label: "Open",
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              borderWidth: 2,
            },
            {
              data: [2, 2, 5, 3, 3, 2, 1],
              label: "Pending",
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgb(255, 205, 86,0.5)",
              borderWidth: 2,
            },
            {
              data: [0, 2, 5, 1, 1, 7, 0],
              label: "Closed",
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132,0.5)",
              borderWidth: 2,
            },
          ],
        },
      });
    }

    return () => {
      myChart.destroy();
    };
  }, []);
  return (
    <div className="px-2 mt-7 w-auto h-[225px] flex flex-row">
      <canvas className="m-auto" id="myChart3"></canvas>
    </div>
  );
}

export default BarChart;
