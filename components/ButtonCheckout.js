"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";
import React from 'react';

const ButtonCheckout = ({ priceId, mode = "payment" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL // Asegúrate de reemplazar esto con tu dominio real
  const successUrl = `${baseUrl}/zonas`;
  const cancelUrl = `${baseUrl}/#pricing`;

  const handlePayment = async () => {
    setIsLoading(true);

    if (status === "unauthenticated") {
      router.push(config.auth.loginUrl);
    }
    try {
      const res = await apiClient.post("/stripe/create-checkout", {
        priceId,
        mode,
        successUrl,
        cancelUrl,
      });

      window.location.href = res.url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn text-lg bg-blue_200 btn-block text-purple_200 rounded-lg border-0 hover:bg-blue_100 group"
      onClick={() => handlePayment()}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : status === "authenticated" ? (
        "Obten " + config?.appName
      ) : ( 
        "Incia sesión")}
    </button>
  );
}

export default ButtonCheckout;
