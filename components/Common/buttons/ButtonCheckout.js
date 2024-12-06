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
  const successUrl = `${baseUrl}/dashboard/zonas`;
  const cancelUrl = `${baseUrl}/#pricing`;

  const handlePayment = async () => {
    setIsLoading(true);

    if (status === "unauthenticated") {
      router.push(config.auth.loginUrl);
    }else{
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
  }
  };

  return (
    <button
      className="btn text-lg bg-green_200 btn-block text-gray_200 rounded-md border-0 hover:bg-green_100 group"
      onClick={() => handlePayment()}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : status === "authenticated" ? (
        "Obten " + config?.appName
      ) : ( 
        "Inicia Sesión")}
    </button>
  );
}

export default ButtonCheckout;
