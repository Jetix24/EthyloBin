"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import config from "@/config";
import React from "react";

const ButtonCta = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handlePayment = async () => {
    setIsLoading(true);

    if (status === "unauthenticated") {
      router.push(config.auth.loginUrl);
    } else {
      router.push(config.auth.zonasUrl);
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn text-lg bg-green_200 btn-block text-gray_200 rounded-md border-0 hover:bg-green_100 group"
      onClick={() => handlePayment()}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : status === "authenticated" ? (
        "Ingresar a " + config?.appName
      ) : (
        "Empieza Ahora"
      )}
    </button>
  );
};

export default ButtonCta;
