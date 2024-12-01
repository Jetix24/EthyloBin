"use client";
import Image from "next/image";
import { useRef, useState } from "react";
const faqList = [
  {
    question: "Falta de monitoreo de condiciones",
    answer: (
      <p>
        No medir parámetros clave como la temperatura, humedad o emisión de gases puede afectar la calidad del compostaje.
      </p>
    ),
  },
  {
    question: "Descomposición ineficiente",
    answer: (
      <p>
        Una mezcla incorrecta de materiales o la falta de rotación adecuada puede ralentizar el proceso y generar malos olores.
      </p>
    ),
  },
  {
    question: "Gasto excesivo de tiempo",
    answer: (
      <p>
        Realizar el monitoreo y manejo del compostaje manualmente consume mucho tiempo y esfuerzo.
      </p>
    ),
  },
  {
    question: "Falta de alertas tempranas",
    answer: (
      <p>
        No contar con avisos automáticos sobre niveles de etileno o condiciones desfavorables puede llevar a un compostaje fallido.
      </p>
    ),
  },
];


const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="text-left">
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-green_300 ${isOpen ? "text-green_200" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current text-black_100`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const Problem = () => {
  return (
    <section className="bg-gray_200" id="problema">
  <div className="max-w-7xl mx-auto px-16 py-16 md:py-16 text-center">
    <div className="mb-12 md:mb-14">
      <h1 className="text-black_100 font-bold md:text-5xl text-4xl mb-4">
        ¿Falta de Gestión en tu Composta?
      </h1>
      <p className="text-green_300 font-semibold text-lg opacity-90 leading-relaxed">
        Al hacer una composta, la gestión de ella puede ser un desafío...
      </p>
    </div>
    <div className=" flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0">
        <Image
          src="/img/problema.webp"
          alt="Problema"
          width={500}
          height={500}
          className="rounded-md"
        />
      </div>
      <div className="max-w-xl text-lg leading-relaxed">
        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
  );
};

export default Problem;
