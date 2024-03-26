'use client';
import React from "react";
import "../app/globals.css";
import { useState, useEffect } from "react";

const TotalCounter = ({ reservationData }) => {

    // État local pour gérer le décompte progressif
    const [counted, setCounted] = useState(0);

    // Effet pour démarrer l'animation de décompte
    useEffect(() => {
        if (reservationData) {
            const totalPersons = reservationData.reduce((total, reservation) => {
                return total + parseInt(reservation.NbPersonne);
            }, 0);

            let start = 0;
            const end = totalPersons;
            const duration = 2000; // Durée de l'animation en millisecondes
            const stepTime = Math.abs(Math.floor(duration / end));
            const timer = setInterval(function () {
                start++;
                setCounted(start);
                if (start === end) {
                    clearInterval(timer);
                }
            }, stepTime);

            // Retour de l'effet pour nettoyer le timer lorsque le composant est démonté
            return () => clearInterval(timer);
        }
    }, [reservationData]);

    // Vérification de reservationData pour éviter les erreurs
    if (!reservationData) {
        return null; // ou gérer le cas où reservationData est undefined
    }

    return (
        <div className="counter-container">
            <div><h2 className="counter animated">{counted}</h2></div>
            <p>Total de personnes ayant/qui va visiter l'exposition </p>
        </div>
    );
};

export default TotalCounter;