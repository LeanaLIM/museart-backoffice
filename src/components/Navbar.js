'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";


const Navbar = () => {
  const router = useRouter();
  return (
    <>
      {
        router.pathname === "/login" ? (
          <nav className="navbar">
            <img src="./img/logo.svg" alt="logo" />
            <Link href="/graph">Graphique</Link>
          </nav>
        ) : null

      }
    </>
  );
};

export default Navbar;
