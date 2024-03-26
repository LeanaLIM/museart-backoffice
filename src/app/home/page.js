'use client';
import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth'; // Importez le hook useAuth
import '../globals.css';
import Head from '../../components/head';
import Navbar from "../../components/Navbar";
import { useRouter } from 'next/navigation';

const Home = () => {
  const isAuthenticated = useAuth(); // Utilisation du hook useAuth pour vérifier l'authentification
  const [reservation, setReservation] = useState([]);
  const [reservationId, setReservationId] = useState(null);
  const router = useRouter();

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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8081/api/api_controller.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: 'delete',
            id: id,
            token: token,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Vérifier si la suppression a réussi
      if (data.success) {
        // Actualiser les réservations après la suppression
        getReservation();
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    window.location.reload();
  };

  const handleEdit = (id) => {
    router.push(`/edit?id=${id}`); // Assurez-vous que l'ID est inclus dans l'URL
  };


  useEffect(() => {
    if (isAuthenticated) {
      getReservation();
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <>
      <Navbar />
      <h1>Gérer les réservations</h1>
      <button onClick={getReservation}>Charger</button>
      <Head />
      {reservation.map((item, index) => (
        <div className="resa-container" key={index}>
          <h3>{item.id}</h3>
          <h4>{item.prenom}</h4>
          <h4>{item.nom}</h4>
          <h4>{item.mail}</h4>
          <h4>{item.dateVisite}</h4>
          <h4>{item.heureVisite}</h4>
          <h4>{item.NbPersonne}</h4>
          <button onClick={() => handleDelete(item.id)}>Supprimer</button>
          <button onClick={() => handleEdit(item.id)}>Modifier</button>
        </div>
      ))}
    </>
  ) : null;
};

export default Home;