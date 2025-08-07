'use client'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const data: ChartData<'doughnut'> = {
    labels: ['Active', 'In Active', 'Closed'],
    datasets: [
        {
            data: [45, 25, 30],
            backgroundColor: ['#3E8EDE', '#FDB45C', '#FF6384'],
            borderWidth: 1,
        }
    ]
}

const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        }
    },
    layout: {
        padding: 10,
    },
}

export default function ChartDoughnut() {
    return <Doughnut data={data} options={options} />
}