'use client';
import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth'; // Importez le hook useAuth
import '../globals.css';
import Navbar from "../../components/Navbar";
import { useRouter } from 'next/navigation';

const Home = () => {
  const isAuthenticated = useAuth(); // Utilisation du hook useAuth pour vérifier l'authentification
  const [reservation, setReservation] = useState([]);
  const [reservationId, setReservationId] = useState(null);
  const router = useRouter();

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Fonction pour formater l'heure
  const formatTime = (timeString) => {
    return timeString.slice(0, 5); // Retourne les 5 premiers caractères (hh:mm)
  };

  //afficher toutes les réservations
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

  //Bouton supprimer
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

  //Bouton modifier
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
      <section className="homepage-container">
        <Navbar />
        <img className="bg" src="/img/whitepattern.png"></img>
        <section className="home-page">
          <div className="home-title">
            <h1>Réservations</h1>
            <p>Mieux visualiser pour mieux gérer...</p>
          </div>
          <button className="reload-btn" onClick={getReservation}>
            <img src="./img/load.svg"></img>Charger</button>
          <table>
            <thead>
              <tr>
                <th className="id-header">ID</th>
                <th className="prenom-header">Prénom</th>
                <th className="nom-header">Nom</th>
                <th className="email-header">Email</th>
                <th className="date-visite-header">Date de visite</th>
                <th className="heure-visite-header">Heure de visite</th>
                <th className="nb-personnes-header">Nombre de personnes</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservation.map((item, index) => (
                <tr key={index}>
                  <td className="id-header">{item.id}</td>
                  <td className="prenom-header">{item.prenom}</td>
                  <td className="nom-header">{item.nom}</td>
                  <td className="email-header">{item.mail}</td>
                  <td className="date-visite-header">{formatDate(item.dateVisite)}</td>
                  <td className="heure-visite-header">{formatTime(item.heureVisite)}</td>
                  <td className="nb-personnes-header">{item.NbPersonne}</td>
                  <td className="actions-header">

                    <button onClick={() => handleEdit(item.id)}><img src="./img/edit.svg" alt="edit"></img></button>
                    <button onClick={() => handleDelete(item.id)}><img src="./img/trash.svg" alt="delete"></img></button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section >
      </section>
    </>
  ) : null;
};

export default Home;