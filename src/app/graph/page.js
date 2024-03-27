"use client";

import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";
import GraphComponent from "../../components/Graph";
import TotalCounter from "../../components/TotalCounter";
import '../globals.css';

const GraphPage = () => {

  const isAuthenticated = useAuth();
  const [monthlyReservationCounts, setMonthlyReservationCounts] = useState([]);
  const [reservationData, setReservationData] = useState([]); // State pour stocker les données de réservation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.andyrbr.fr/api_controller.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: "getReservation",
              token: localStorage.getItem("token"),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setReservationData(data); // Stocker les données de réservation dans le state

          const monthlyCounts = new Array(12).fill(0);
          data.forEach((item) => {
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

  // Calculer le total des valeurs de NbPersonne
  const totalPersons = reservationData.reduce((total, reservation) => {
    return total + parseInt(reservation.NbPersonne);
  }, 0);

  return isAuthenticated ? (
    <>
      <section className="graphpage-container">
        <Navbar />
        <img className="bg" src="/img/whitepattern.png"></img>
        <section className="graph-page">
          <div className="titleGraph">
            <h1>Graphiques</h1>
            <p>Ayons une vision plus précise...</p>
          </div>
          <div>
            <div className="graphique-page">
              <div className="linear-graph">
                <GraphComponent monthlyReservationCounts={monthlyReservationCounts} />
              </div>
              <div className="total-counter">
                <TotalCounter reservationData={reservationData} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  ) : null;
};

export default GraphPage;