"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corregido de "next/navigation" a "next/router"
import config from "@/config";
import React from 'react';
import Image from 'next/image';

const ButtonSignin = ({ text = "Iniciar sesión", extraStyle, hasAccess }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const handleClick = () => {
    if (status === "unauthenticated") {
      router.push(config.auth.loginUrl);
    } else if (hasAccess){
      router.push(config.auth.callbackUrl);
    }
  };

  return (
    <button
      className={`btn ${extraStyle ? extraStyle : ""} ${isLoading ? "btn-disabled" : ""}`} // Añade una clase para estilizar el botón deshabilitado
      onClick={handleClick}
      disabled={isLoading} // Deshabilita el botón mientras carga
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span> // Spinner mostrado condicionalmente
      ) : status === "authenticated" && session.user ? (
        <>
          <Image
            src={session.user.image || "/default-profile.png"} // Asegúrate de tener una imagen predeterminada
            alt={session.user.name || "Account"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
          <span>{session.user.name || session.user.email || "Account"}</span>
        </>
      ) : (
        <span>{text}</span> // Texto del botón cuando no está cargando y no está autenticado
      )}
    </button>
  );
};

export default ButtonSignin;