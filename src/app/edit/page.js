'use client';

import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import '../globals.css';


const Edit = () => {
  const isAuthenticated = useAuth(); // Utilisation du hook useAuth pour vérifier l'authentification
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    dateVisite: "",
    heureVisite: "",
    NbPersonne: ""
  });

  const router = useRouter();
  const id = useSearchParams().get('id');

  const isWeekend = (date) => {
    const day = new Date(date).getDay();
    return day === 0 || day === 6; // 0 pour dimanche, 6 pour samedi
  };

  useEffect(() => {
    // Fetch reservation data only if id is available
    if (id) {
      fetchReservation(id);
    }
  }, [id]);

  const fetchReservation = async (id) => {
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!isWeekend(selectedDate)) {
      setFormData({ ...formData, dateVisite: selectedDate });
    } else {
      // Réinitialiser la valeur de date si c'est un week-end
      alert("Les réservations ne sont pas autorisées les weekends.");
    }
  };

  // Fonction pour générer les options d'heure entre 10h et 18h
  const generateHeureOptions = () => {
    const options = [];
    for (let heure = 10; heure <= 18; heure++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const heureFormattee = `${heure < 10 ? '0' + heure : heure}:${minute < 10 ? '0' + minute : minute}`;
        options.push(<option key={heureFormattee} value={heureFormattee}>{heureFormattee}</option>);
      }
    }
    return options;
  };

  // Fonction pour générer les options du nombre de personnes de 1 à 10
  const generateNbPersonneOptions = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, prenom, mail, dateVisite, heureVisite, NbPersonne } = formData;
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
          id: id, // Utiliser l'id depuis router.query
          nom: nom,
          prenom: prenom,
          emailupdate: mail,
          dateVisite: dateVisite,
          heureVisite: heureVisite,
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

  return isAuthenticated ? (
    <>
      <Navbar />
      <img className="bg" src="/img/whitepattern.png"></img>
      <section className="edit-container">
        <form onSubmit={handleSubmit}>

          <h1>Modifier la réservation</h1>

          <div className="form-container">
            <div className="form">
              <div className="field">
                <label htmlFor="nom">Nom :</label>
                <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} required /><br />
              </div>
              <div className="field">
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required /><br />
              </div>
              <div className="field">
                <label htmlFor="mail">Mail :</label>
                <input type="email" id="mail" name="mail" value={formData.mail} onChange={handleChange} required /><br />
              </div>
            </div>
            <div className="form">
              <div className="field">
                <label htmlFor="dateVisite">Date de visite :</label>
                <input type="date" id="dateVisite" name="dateVisite" value={formData.dateVisite} onChange={handleDateChange} required /><br />
              </div>
              <div className="field">
                <label htmlFor="heureVisite">Heure de visite :</label>
                <select id="heureVisite" name="heureVisite" value={formData.heureVisite} onChange={handleChange} required>
                  <option value="">Choisissez une heure de réservation</option>
                  {generateHeureOptions()}
                </select><br />
              </div>
              <div className="field">
                <label htmlFor="NbPersonne">Nombre de personnes :</label>
                <select id="NbPersonne" name="NbPersonne" value={formData.NbPersonne} onChange={handleChange} required>
                  <option value="">Choisissez le nombre de personnes</option>
                  {generateNbPersonneOptions()}
                </select><br />
              </div>
            </div>
          </div>

          <input type="submit" value="Enregistrer" className="submit-btn" />
        </form>
      </section>
    </>
  ) : null;
};

export default Edit;