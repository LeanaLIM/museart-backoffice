"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Supprimer les données du localStorage
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <nav className="navbar">
        <img className="" src="./img/logo.svg" alt="logo" />
        <ul>
          <li>
            <Link href="/home">Accueil</Link>
          </li>
          <li>
            <Link href="/graph">Graphique</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Déconnexion</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
