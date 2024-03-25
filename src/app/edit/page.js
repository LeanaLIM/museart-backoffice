'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

const Edit = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    emailupdate: "",
    dateVisite: "",
    HeureVisite: "",
    NbPersonne: ""
  });
  const router = useRouter();
  const { id } = router.query || {};

  useEffect(() => {
    // Fetch reservation data only if id is available
    if (id) {
      fetchReservation();
    }
  }, [id]);

  const fetchReservation = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/api_controller.php?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { nom, prenom, mail, dateVisite, HeureVisite, NbPersonne } = formData;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8081/api/api_controller.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: 'update',
        token: token,
        id: id,
        nom: nom,
        prenom: prenom,
        emailupdate: mail, // Corrected from emailupdate to mail
        dateVisite: dateVisite,
        heurevisite: HeureVisite, // Corrected from heurevisite to HeureVisite
        NbPersonne: NbPersonne
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData.message); // Assuming API returns a message
    router.push("/home");
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <>
      <Navbar />
      <div>
        <h1>Modifier la réservation</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} required /><br />

          <label htmlFor="prenom">Prénom :</label>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required /><br />

          <label htmlFor="mail">Mail :</label>
          <input type="email" id="mail" name="mail" value={formData.mail} onChange={handleChange} required /><br />

          <label htmlFor="dateVisite">Date de visite :</label>
          <input type="date" id="dateVisite" name="dateVisite" value={formData.dateVisite} onChange={handleChange} required /><br />

          <label htmlFor="HeureVisite">Heure de visite :</label>
          <input type="time" id="HeureVisite" name="HeureVisite" value={formData.HeureVisite} onChange={handleChange} required /><br />

          <label htmlFor="NbPersonne">Nombre de personnes :</label>
          <input type="number" id="NbPersonne" name="NbPersonne" value={formData.NbPersonne} onChange={handleChange} required /><br />

          <input type="submit" value="Enregistrer" />
        </form>
      </div>
    </>
  );
};

export default Edit;