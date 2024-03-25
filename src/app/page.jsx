"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8081/api/api_controller.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: email,
            passwd: password,
          }),
        }
      );

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
        return; //coucou driss le plus beau mdrrr tg
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
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Make the input required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Make the input required
        />
        <input type="submit" value="Submit" />
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Login;
