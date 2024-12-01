"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
    {
      question: "¿Cómo empiezo a usar la compostadora inteligente?",
      answer: (
        <p>
          Solo necesitas adqurir la compostadora, conectarlos a nuestra plataforma y comenzar a monitorear tus residuos orgánicos.
        </p>
      ),
    },
    {
      question: "¿Cómo agrego y organizo los materiales en la compostadora?",
      answer: (
        <p>
          Clasifica tus residuos orgánicos (verdes y marrones) y agrégalos en el lote correspondiente. La compostadora te ayudará a mantener un balance adecuado.
        </p>
      ),
    },
    {
      question: "¿Qué datos puedo visualizar en la plataforma?",
      answer: (
        <p>
          Puedes monitorear parámetros como temperatura, humedad, niveles de gases y progreso del compostaje en tiempo real desde la plataforma.
        </p>
      ),
    },
  ];
  

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
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

const FAQ = () => {
  return (
    <section className="bg-gray_200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-green_200 mb-4">PF</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-black_100">
            Preguntas Frecuentes
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
