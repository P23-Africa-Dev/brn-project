'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
    apiUrl?: string; // Laravel API endpoint
}

const BasicPolarChart: React.FC<ChartProps> = ({ apiUrl }) => {
    const [chartData, setChartData] = useState<{
        series: number[];
        options: any;
    }>({
        series: [],
        options: {
            chart: {
                type: 'polarArea',
            },
            labels: ['Read', 'Unread'], // 🟢 Order: Read first (top), Unread second (bottom)
            colors: ['#A47AF0', '#193E47'], // 🟣 Lavender for Read, Dark Teal for Unread
            stroke: {
                colors: ['#fff'],
            },
            fill: {
                opacity: 0.9,
                type: ['pattern', 'solid'], // Pattern for Read, solid for Unread
                pattern: {
                    style: ['slantedLines', 'solid'], // 🟢 Curve-like pattern for Read
                },
            },
            legend: {
                position: 'bottom',
                labels: {
                    colors: '#374151', // dark gray for text
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: { width: 280 },
                        legend: { position: 'bottom' },
                    },
                },
            ],
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (apiUrl) {
                    // 🟢 Fetch from backend
                    const response = await axios.get(apiUrl);
                    // Expected format: { read: number, unread: number }
                    const { read, unread } = response.data;

                    setChartData((prev) => ({
                        ...prev,
                        series: [read, unread],
                    }));
                } else {
                    // 🟢 Dummy fallback
                    const dummyResponse = { read: 120, unread: 45 };

                    setChartData((prev) => ({
                        ...prev,
                        series: [dummyResponse.read, dummyResponse.unread],
                    }));
                }
            } catch (error) {
                console.error('Error fetching Polar Chart data:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    return (
        <div className="relative overflow-hidden">
            <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" height={350} />
        </div>
    );
};

export default BasicPolarChart;
