"use client"
import Image from "next/image";
import ButtonCta from "@/components/Common/buttons/ButtonCta";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="/img/background.webp"
        alt="Background"
        className="object-cover w-full"
        fill
        priority
      />
      
      <div className="relative hero-overlay bg-black_100 bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8 w-full">
        <div className="flex flex-col items-center max-w-5xl p-8 md:p-0 ">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12 text-white">
          Convierte tus residuos en vida: optimiza el compostaje de manera inteligente
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16 text-green_100">
          Optimiza tu tiempo y aumenta la eficiencia con nuestra herramienta digital fácil de usar
          </p>
          <div className="flex flex-col items-center gap-4 md:gap-8">
          <ButtonCta />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
