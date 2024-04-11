"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

function DonutChart({
  openApplicationsCount,
  closedApplicationsCount,
  pendingApplicationsCount,
}: {
  openApplicationsCount: any;
  closedApplicationsCount: any;
  pendingApplicationsCount: any;
}) {
  useEffect(() => {
    const canvas3 = document?.getElementById("myChart4");
    const ctx = (canvas3 as HTMLCanvasElement)?.getContext("2d");

    if (ctx) {
      var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Open", "Pending", "Closed"],
          datasets: [
            {
              data: [
                openApplicationsCount,
                pendingApplicationsCount,
                closedApplicationsCount,
              ],
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
