'use client';
import { Suspense } from "react";

const Form = ({ formData, handleChange, handleDateChange, generateHeureOptions, generateNbPersonneOptions, handleSubmit }) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
    );

};

export default Form;