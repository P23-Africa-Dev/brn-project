'use client';
import axios from 'axios';
import { format, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
    userId?: number;
}

interface ChartDataPoint {
    date: string;
    minutes_online: number;
}

interface ChartState {
    series: {
        name: string;
        data: number[];
    }[];
    options: {
        chart: {
            type: 'area';
            height: number;
            zoom: { enabled: boolean };
        };
        dataLabels: {
            enabled: boolean;
        };
        stroke: {
            curve: string;
        };
        labels: string[];
        xaxis: {
            type: string;
        };
        yaxis: {
            opposite: boolean;
        };
        legend: {
            horizontalAlign: 'left' | 'center' | 'right';
        };
    };
}

const BasicAreaChart: React.FC<ChartProps> = ({ userId }) => {
    const [chartData, setChartData] = useState<ChartState>({
        series: [
            {
                name: 'Minutes Online',
                data: [],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: { enabled: false },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            labels: [],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                opposite: false,
            },
            legend: {
                horizontalAlign: 'left',
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/user/${userId || ''}`);
                const { data } = response.data;
                
                const today = new Date();
                const last7Days = Array.from({ length: 7 }, (_, i) => {
                    const date = subDays(today, 6 - i);
                    return format(date, 'yyyy-MM-dd');
                });

                const activityData = last7Days.map(date => ({
                    date,
                    minutes_online: data[date] || 0
                }));

                setChartData(prev => ({
                    ...prev,
                    series: [{
                        name: 'Minutes Online',
                        data: activityData.map(point => point.minutes_online)
                    }],
                    options: {
                        ...prev.options,
                        labels: activityData.map(point => point.date)
                    }
                }));
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };

        // Fetch initial data
        fetchData();

        // Set up polling every minute
        const interval = setInterval(fetchData, 60000);

        return () => clearInterval(interval);
    }, [userId]);

    return (
        <div className="relative overflow-hidden bg-transparent">
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
