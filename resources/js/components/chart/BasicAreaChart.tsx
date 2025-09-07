"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";



interface ChartProps {
    apiUrl?: string; // Laravel API endpoint
}
const BasicAreaChart:  React.FC<ChartProps>  = ({ apiUrl }) => {
  const [chartData, setChartData] = useState<{
    series: any[];
    options: any;
  }>({
    series: [
      {
        name: "STOCK ABC",
        data: [], // will be filled in useEffect
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: { enabled: false },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      // title: {
      //   text: "Fundamental Analysis of Stocks",
      //   align: "left",
      // },
      // subtitle: {
      //   text: "Price Movements",
      //   align: "left",
      // },
      labels: [] as string[],
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: false,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });

  // 🟢 Load dummy data first
  useEffect(() => {
    const dummyData = {
      prices: [34, 44, 54, 21, 12, 43, 33],
      dates: [
        "2025-09-01",
        "2025-09-02",
        "2025-09-03",
        "2025-09-04",
        "2025-09-05",
        "2025-09-06",
        "2025-09-07",
      ],
    };

    setChartData((prev) => ({
      ...prev,
      series: [
        {
          name: "STOCK ABC",
          data: dummyData.prices,
        },
      ],
      options: {
        ...prev.options,
        labels: dummyData.dates,
      },
    }));
  }, []);


    // 🟢 Fetch API Data
  // useEffect(() => {
  //   const apiUrl = "http://localhost:8000/api/chart-data"; // update if deployed

  //   axios
  //     .get(apiUrl)
  //     .then((res) => {
  //       const { prices, dates } = res.data;

  //       setChartData((prev) => ({
  //         ...prev,
  //         series: [
  //           {
  //             name: "STOCK ABC",
  //             data: prices,
  //           },
  //         ],
  //         options: {
  //           ...prev.options,
  //           labels: dates,
  //         },
  //       }));
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching chart data:", err);
  //     });
  // }, []);

  return (
    <div className="relative overflow-hidden  bg-transparent ">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={105}
      />
    </div>
  );
};

export default BasicAreaChart;
