'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data: ChartData<'bar'> = {
    labels: ['Main', 'Maharlika', 'Cotobato', 'Davao', 'Cebu', 'Baguio'],
    datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['#3E8EDE', '#FDB45C', '#FF6384'],
            borderRadius: 5,
        },
    ]
}

const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: false,
        }
    },
    scales: {
        x: {
            beginAtZero: true,
        },
    },
    layout: {
        padding: 10,
    },
}

export default function Chart() {
    return <Bar data={data} options={options} />
}