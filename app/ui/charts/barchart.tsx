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
            {
              data: [66, 144, 146, 116, 107, 131, 43],
              label: "Applied",
              borderColor: "rgb(109, 253, 181)",
              backgroundColor: "rgb(109, 253, 181,0.5)",
              borderWidth: 2,
            },
            {
              data: [40, 100, 44, 70, 63, 30, 10],
              label: "Accepted",
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              borderWidth: 2,
            },
            {
              data: [20, 24, 50, 34, 33, 23, 12],
              label: "Pending",
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgb(255, 205, 86,0.5)",
              borderWidth: 2,
            },
            {
              data: [6, 20, 52, 12, 11, 78, 21],
              label: "Rejected",
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
    <div className="px-2 mt-7 w-auto h-[225px]  flex flex-row">
      <canvas style={{ width: "50vw" }} className="" id="myChart3"></canvas>
    </div>
  );
}

export default BarChart;
