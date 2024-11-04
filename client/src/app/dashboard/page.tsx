"use client"
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const dashboard = () => {
    const lineData = {
        labels: ['plane', 'helicopter', 'boat', 'train', 'subway', 'bus', 'car', 'moto', 'bicycle'],
        datasets: [
            {
                label: 'US',
                data: [400, 300, 200, 400, 500, 200, 300, 200, 100],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'France',
                data: [200, 400, 300, 200, 300, 400, 200, 100, 300],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'Japan',
                data: [100, 200, 400, 100, 300, 200, 400, 300, 200],
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    };

    const barData = {
        labels: ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM'],
        datasets: [
            {
                label: 'Sales Quantity',
                data: [200, 300, 400, 250, 450, 300, 200],
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#cc65fe',
                    '#ffce56',
                    '#36eb96',
                    '#ff9f40',
                    '#4bc0c0',
                ],
            },
        ],
    };

    const pieData = {
        labels: ['Donut', 'Fries', 'Kebab', 'Sandwich', 'Burger', 'Hot Dog'],
        datasets: [
            {
                label: 'Revenue Generated',
                data: [300, 50, 100, 40, 120, 75],
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#cc65fe',
                    '#ffce56',
                    '#36eb96',
                    '#ff9f40',
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <div className="flex">
                <aside className="w-1/5 bg-gray-800 p-4 space-y-4">
                    <div className="text-center">
                        <img
                            src="/profile.jpg"
                            alt="User Profile"
                            className="w-16 h-16 rounded-full mx-auto"
                        />
                        <h2 className="mt-2">Admin Name</h2>
                    </div>
                    <nav className="space-y-2">
                        <a href="#" className="flex items-center text-gray-200 hover:text-white">
                            <span className="material-icons mr-12 "></span> Dashboard
                        </a>
                        <a href="#" className="flex items-center text-gray-200 hover:text-white">
                            <span className="material-icons mr-12"></span> Settings
                        </a>
                    </nav>
                </aside>

                <main className="w-4/5 p-6 space-y-6">
                    <header className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">DASHBOARD</h1>
                    </header>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gray-800 p-4 rounded text-center">
                            <p>Ads</p>
                            <h2 className="text-2xl font-bold">12,361</h2>
                        </div>
                        <div className="bg-gray-800 p-4 rounded text-center">
                            <p>Auction Data</p>
                            <h2 className="text-2xl font-bold">431,225</h2>
                        </div>
                        <div className="bg-gray-800 p-4 rounded text-center">
                            <p>Participants</p>
                            <h2 className="text-2xl font-bold">32,441</h2>
                        </div>
                        <div className="bg-gray-800 p-4 rounded text-center">
                            <p>Response Received</p>
                            <h2 className="text-2xl font-bold">1,325,134</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-800 p-6 rounded">
                            <h2 className="text-lg font-semibold mb-4">Data -1</h2>
                            <Line data={lineData} options={{ responsive: true }} />
                        </div>
                        <div className="bg-gray-800 p-6 rounded">
                            <h2 className="text-lg font-semibold mb-4">Data -2</h2>
                            <Bar data={barData} options={{ responsive: true }} />
                        </div>
                        <div className="col-span-1 bg-gray-800 p-6 rounded">
                            <h2 className="text-lg font-semibold mb-4">Analysis</h2>
                            <Pie data={pieData} options={{ responsive: true }} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default dashboard;
