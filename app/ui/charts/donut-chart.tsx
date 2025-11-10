"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

function DonutChart({
  openApplicationsCount,
  closedApplicationsCount,
  pendingApplicationsCount,
}: {
  openApplicationsCount: number;
  closedApplicationsCount: number;
  pendingApplicationsCount: number;
}) {
  useEffect(() => {
    // 1. Declare chart var in scope accessible to cleanup
    let myChart: Chart | undefined;

    const canvas3 = document?.getElementById("myChart4");
    const ctx = (canvas3 as HTMLCanvasElement)?.getContext("2d");

    if (ctx) {
      // 2. Assign to the outer var
      myChart = new Chart(ctx, {
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
                "rgb(75, 192, 192)", // Fixed extra space
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          // Doughnut charts don't use scales - removed
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // 3. Cleanup references the outer var
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [
    openApplicationsCount,
    pendingApplicationsCount,
    closedApplicationsCount,
  ]);

  return (
    <div className="absolute px-14 t-0 w-[300px]">
      <canvas id="myChart4"></canvas>
    </div>
  );
}

export default DonutChart;
