"use client";
import Image from "next/image";
import { useRef, useState } from "react";
const faqList = [
  {
    question: "Falta de control sobre el stock",
    answer: (
      <p>
        No tener un registro preciso y actualizado de los productos disponibles.
      </p>
    ),
  },
  {
    question: "Desperdicio de productos",
    answer: (
      <p>
        La falta de rotación adecuada de productos perecederos puede resultar en pérdidas por caducidad o deterioro.
      </p>
    ),
  },
  {
    question: "Gasto excesivo de tiempo",
    answer: (
      <p>
        La gestión manual del inventario consume mucho tiempo y es propensa a errores.
      </p>
    ),
  },
  {
    question: "Errores en el registro de inventario",
    answer: (
      <p>
        Ingresar datos incorrectos o no registrar las salidas y entradas de productos correctamente puede causar discrepancias en el inventario.
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
          className={`flex-1 text-blue_purple ${isOpen ? "text-cute_purple" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current text-dark_purple`}
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
    <section className="bg-cute_white">
  <div className="max-w-7xl mx-auto px-16 py-16 md:py-16 text-center">
    <div className="mb-12 md:mb-14">
      <h1 className="text-dark_purple font-bold md:text-5xl text-4xl mb-4">
        ¿Falta de Gestión en el Inventario de tu Negocio?
      </h1>
      <p className="text-blue_purple font-semibold text-lg opacity-90 leading-relaxed">
        En muchos negocios, la gestión del inventario puede ser un desafío...
      </p>
    </div>
    <div className=" flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0">
        <Image
          src="/img/problema-inventario.jpg"
          alt="Problema"
          width={500}
          height={500}
          className="rounded-lg"
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
