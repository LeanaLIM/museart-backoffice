'use client';
import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const isAuthenticated = useAuth(); // Utilisation du hook useAuth pour vérifier l'authentification
  const [reservation, setReservation] = useState([]);

  const getReservation = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8081/api/api_controller.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          action: "getReservation",
          token: token,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setReservation(data);
      } else {
        console.error(data);
        setReservation([]);
      }
    } catch (error) {
      console.error(error);
      setReservation([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getReservation();
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <>
      <h1>Test</h1>
      <button onClick={getReservation}>Get Reservation</button>
      {reservation.map((item, index) => (
        <div key={index}>
          <h1>{item.prenom}</h1>
          <h1>{item.nom}</h1>
          <h1>{item.mail}</h1>
          <h1>{item.dateVisite}</h1>
          <h1>{item.HeureVisite}</h1>
          <h1>{item.NbPersonne}</h1>
        </div>
      ))}
    </>
  ) : null;
};

export default Home;
