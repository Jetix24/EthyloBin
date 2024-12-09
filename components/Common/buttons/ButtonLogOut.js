import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiLogoutBoxFill } from 'react-icons/ri'; // Importa el ícono

const ButtonLogOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false); // Estado para controlar si el botón está activo
  const router = useRouter();
  const { status } = useSession();

  const handleLogOut = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.push('/');
    setIsLoading(false);
  };

  // Funciones para manejar el estado activo
  const handleMouseEnter = () => setActive(true);
  const handleMouseLeave = () => setActive(false);

  if (status === "authenticated") {
    return (
      <button
        className={`btn text-lg md:text-xl bg-green_200 btn-block text-gray_200 rounded-md border-0 hover:bg-green_100 group sm:ml-4 ${active && 'bg-green_100 text-gray_200'} sm:w-10`}
        onClick={handleLogOut}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <RiLogoutBoxFill className="h-7 w-7 shrink-0" /> // Usa el ícono aquí
        )}
      </button>
    );
  }

  return null;
};

export default ButtonLogOut;