'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
  apiUrl?: string; // Optional Laravel API endpoint
}

const BasicColumnChart: React.FC<ChartProps> = ({ apiUrl }) => {
  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: any;
  }>({
    series: [
      {
        name: 'Users',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 6,
          opacity: 0.25,
          color: '#0B1727', // same as bar but slightly faded
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 6,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
        },
      },
      grid: {
        borderColor: '#E5E7EB',
      },
      colors: ['#0B1727'], // ✅ Updated bar color
      legend: {
        position: 'top',
        labels: {
          colors: '#374151',
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (apiUrl) {
          const response = await axios.get(apiUrl);
          const { categories, values } = response.data;

          setChartData((prev) => ({
            ...prev,
            series: [{ name: 'Users', data: values }],
            options: {
              ...prev.options,
              xaxis: { ...prev.options.xaxis, categories },
            },
          }));
        } else {
          const dummyResponse = {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [10, 25, 15, 30, 22, 18, 27],
          };

          setChartData((prev) => ({
            ...prev,
            series: [{ name: 'Users', data: dummyResponse.values }],
            options: {
              ...prev.options,
              xaxis: { ...prev.options.xaxis, categories: dummyResponse.categories },
            },
          }));
        }
      } catch (error) {
        console.error('Error fetching Column Chart data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="relative z-10 overflow-hidden">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default BasicColumnChart;
