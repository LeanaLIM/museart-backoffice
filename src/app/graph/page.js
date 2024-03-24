'use client';

import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const GraphPage = () => {
  const [monthlyReservationCounts, setMonthlyReservationCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/api_controller.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: "getReservation",
            token: localStorage.getItem("token"),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          // Regrouper les réservations par mois
          const monthlyCounts = new Array(12).fill(0);
          data.forEach(item => {
            const month = new Date(item.dateVisite).getMonth();
            monthlyCounts[month]++;
          });
          setMonthlyReservationCounts(monthlyCounts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Créer le graphique linéaire une fois que les données sont récupérées
    if (monthlyReservationCounts.length > 0) {
      const ctx = document.getElementById('reservationChart');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Nombre de réservations',
            data: monthlyReservationCounts,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
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

export default GraphPage;