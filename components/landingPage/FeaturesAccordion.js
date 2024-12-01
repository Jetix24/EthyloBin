"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { WiSmoke } from "react-icons/wi";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";

const features = [
  {
    title: "Etileno",
    description:
      "Etileno es un gas que se produce de forma natural en frutas y vegetales, pero en concentraciones elevadas puede acelerar el proceso de maduración y descomposición de los alimentos. En esta sección se podrá visualizar la concentración de etileno en el ambiente del almacén.",
    type: "image",
    path: "/img/etileno_medicion_cel.png",
    format: "img/png",
    icon: WiSmoke,
  },
  {
    title: "Temperatura",
    description:
      "La temperatura es un indicador clave del progreso del proceso y de la actividad microbiana. En esta sección se podrá visualizar la temperatura del compostaje.",
    type: "image",
    path: "/img/temperatura_medicion.png",
    alt: "img/png",
    icon: FaTemperatureQuarter,
  },
  {
    title: "Humedad",
    description:
      "La humedad es un factor importante para el desarrollo de microorganismos y la descomposición de los materiales. En esta sección se podrá visualizar la humedad del compostaje.",
    type: "image",
    path: "/img/humedad_medicion.png",
    alt: "img/png",
    icon: IoWater,
  },
];

const Item = ({ feature, isOpen, setFeatureSelected }) => {
  const accordion = useRef(null);
  const { title, description, icon: Icon } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-green_100 font-bold text-left md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-100 ${isOpen ? "text-green_200" : ""}`}>
          <Icon className="w-6 h-6" />
        </span>
        <span
          className={`flex-1 text-base-content ${
            isOpen ? "text-green_200 font-semibold" : ""
          }`}
        >
          <h3 className="inline">{title}</h3>
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{description}</div>
      </div>
    </li>
  );
};

const Media = ({ feature }) => {
  const { type, path, alt } = feature;
  const style = "rounded-2xl aspect-square w-full sm:w-[26rem]";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <section
      className="flex flex-col justify-center items-center md:px-10 py-24 md:py-32 space-y-24 md:space-y-32 max-w-8xl mx-auto bg-gray_200"
      id="features"
    >
      <div className="px-8">
        <h2 className="md:text-5xl text-4xl tracking-tight mb-12 md:mb-8 font-bold text-black_100 text-center">
          Todo lo que necesitas para tu composta{" "}
          <span className="block text-green_100 md:px-8 md:leading-relaxed">
            y hacerla más eficiente.
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col md:flex-row justify-between items-stretch w-full">
            <ul className="w-full md:w-auto">
              {features.map((feature, i) => (
                <Item
                  key={feature.title}
                  index={i}
                  feature={feature}
                  isOpen={featureSelected === i}
                  setFeatureSelected={() => setFeatureSelected(i)}
                />
              ))}
            </ul>

            <Media feature={features[featureSelected]} key={featureSelected} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;