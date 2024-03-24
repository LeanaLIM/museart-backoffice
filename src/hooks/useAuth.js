import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setAuthenticated(true);
        } else {
            // Si aucun token n'est présent, rediriger vers la page de connexion
            router.push('/login');
        }
    }, [router]);

    return authenticated;
};

export default useAuth;