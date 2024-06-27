"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';

const CTA = ({session}) => {

  const router = useRouter(); // Paso 2: Inicializar useRouter

  // Modificar la función manejadora para usar currentUser
  const handleClick = () => {
    if (!session) {
      router.push('/signin');
    } else {
      router.push('/zonas');
    }
  };

  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="/img/background.jpeg"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-blue_500 bg-opacity-60"></div>
      <div className="relative hero-content text-center text-neutral-content p-8 w-full">
        <div className="flex flex-col items-center max-w-4xl p-8 md:p-0 ">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
          Simplifica la gestión de inventario para tu negocio de alimentos
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
          Optimiza tu tiempo y aumenta la eficiencia con nuestra herramienta digital fácil de usar
          </p>

          <button onClick={handleClick} className="btn bg-blue_200 rounded-md text-lg text-purple_200 border-0 hover:bg-blue_100 btn-wide ">
            Empieza ahora
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
