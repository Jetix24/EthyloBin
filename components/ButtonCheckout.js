"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({ priceId, mode = "payment", hasAccess, session}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL // Asegúrate de reemplazar esto con tu dominio real
    const successUrl = `${baseUrl}/zonas`;
    const cancelUrl = `${baseUrl}/`;

    if (!session) {         // Redirigir a la página de inicio de sesión si no hay usuario
      router.push(config.auth.loginUrl);
    } else if (hasAccess) {
      router.push(config.auth.callbackUrl);
    } else{
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
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn text-lg bg-blue_200 btn-block text-purple_200 rounded-md border-0 hover:bg-blue_100 group"
      onClick={handlePayment}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : "Obten " + config?.appName}
    </button>
  );
};

export default ButtonCheckout;
