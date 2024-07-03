"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corregido de "next/navigation" a "next/router"
import config from "@/config";
import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const ButtonSignin = ({ text = "Iniciar sesión", extraStyle }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClick = () => {
    if (status === "unauthenticated") {
      router.push(config.auth.loginUrl);
    }
  };

  if (status === "authenticated") {
    return (
      <Link
        href={config.auth.zonasUrl}
        className={`btn ${extraStyle ? extraStyle : ""}`}
      >
        {session.user?.image ? (
          <Image
            src={session.user?.image}
            alt={session.user?.name || "Account"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0">
            {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
          </span>
        )}
        {session.user?.name || session.user?.email || "Account"}
      </Link>
    );
  }

  return (
    <button
      className={`btn ${extraStyle ? extraStyle : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ButtonSignin;