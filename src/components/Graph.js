'use client';

import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


const GraphComponent = ({ monthlyReservationCounts }) => {
    useEffect(() => {
        if (monthlyReservationCounts.length > 0) {
            const ctx = document.getElementById("reservationChart");
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: [
                        "Jan",
                        "Fev",
                        "Mar",
                        "Avr",
                        "Mai",
                        "Juin",
                        "Juil",
                        "Août",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    datasets: [
                        {
                            label: "Nombre de réservations",
                            data: monthlyReservationCounts,
                            fill: true, // Remplissage activé
                            backgroundColor: "rgba(144, 36, 42, 0.2)", // Couleur de remplissage transparente
                            borderColor: "#90242A", // Couleur de la ligne
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 20,
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom", // Position de la légende en bas
                            labels: {
                                color: "#90242A",
                            },
                        },
                        onClick: () => false, // Désactiver le clic sur la légende
                    },
                },
            });
        }
    }, [monthlyReservationCounts]);


    return (
        <div>
            <h1>Graphique des réservations par mois</h1>
            <canvas id="reservationChart" width="400" height="200"></canvas>
        </div>
    );
};

export default GraphComponent;