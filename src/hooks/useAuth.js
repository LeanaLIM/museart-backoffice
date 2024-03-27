
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthenticated(false); // Pas de token, donc l'utilisateur n'est pas authentifié
                router.push('/');
            }

            try {
                const response = await fetch('http://api.andyrbr.fr/api_controller.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        token: localStorage.getItem("token"),
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result === "valide") {
                        setIsAuthenticated(true); // Token valide, l'utilisateur est authentifié
                    } else {
                        setIsAuthenticated(false); // Token invalide, l'utilisateur n'est pas authentifié
                        localStorage.removeItem('token'); // Supprime le token invalide du localStorage
                    }
                } else {
                    console.error('Erreur lors de la vérification du token');
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du token : ', error);
                localStorage.removeItem('token');
            }
        };

        checkTokenValidity();
    }, []);

    return isAuthenticated;
};

export default useAuth;