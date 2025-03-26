import React, { useState, useEffect } from 'react';
import { DailyAPI } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Chart.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Chart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
    const fetchDailyData = async () => {
        const result = await DailyAPI();
        if (result.length > 0) setDailyData(result);
        else console.log("no data received from API");
    }
    fetchDailyData();
    }, []);
    const reversedData = [...dailyData].reverse();

    const lineChart = (
        //if daily data > 0, then true, if 0 means false
        <Line
            data={{
                labels:reversedData.map((object) => object.date),
                datasets: [{
                    data: reversedData.map((object) => object.positive),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    backgroundColor: 'rgba(51, 51, 255, 0.5)'
                },  {
                    data: reversedData.map((object) => object.hospitalized),
                    label: 'Active',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)'
                },{
                   data: reversedData.map((object) => object.death),
                   label: 'Deaths',
                   borderColor: 'red',
                   backgroundColor: 'rgba(255, 150, 0, 0.5)'
                }]
            }}
        />
    );

    const barChart = (
        data && <Bar
            data={{
                labels: ['Infected', 'Active', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 100, 200, 0.5)',
                        'rgba(100, 200, 0, 0.5)',
                        'rgba(200, 100, 0, 0.5)'
                    ],
                    data: [data.confirmed, data.active, data.deaths]
                }]
            }}
        />
    );

    return (
        <div className={styles.container}>
            {(country === "" || country === "Daily") ? lineChart : barChart}
        </div>

    );
};

export default Chart;