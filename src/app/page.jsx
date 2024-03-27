"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://api.andyrbr.fr/api_controller.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          passwd: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      console.log(data);
      //si data commence par "error: " alors c'est une erreur
      if (data.startsWith("error: ")) {
        setError(data.replace("error: ", ""));
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      localStorage.setItem("token", data);
      router.push("/home");
    } catch (error) {
      console.error("Error:", error);
      router.push("/");
    }
  };

  return (
    <>
      <section className="login-container">
        <img className="bg" src="/img/woman3bg.png"></img>

        <form onSubmit={handleSubmit}>
          <h1>Connexion</h1>

          <div className="form">
            <div className="field">
              <label htmlFor="email">Login *</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Make the input required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Mot de passe *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Make the input required
              />
            </div>
          </div>

          <input type="submit" value="Se connecter" className="submit-btn" />
          <p className="error">* Champs obligatoires</p>
          {error && <p className="error">{error}</p>}
        </form>
      </section>
    </>
  );
};

export default Login;
