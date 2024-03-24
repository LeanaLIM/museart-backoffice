'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

            const token = await response.text();
            localStorage.setItem("token", token);
            router.push("/home");
        } catch (error) {
            console.error("Error:", error);
            router.push("/login");
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
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
};

export default Login;