"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaBasketShopping } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { MdOutlineKitchen } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";


// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: "Areas",
    description:
      "Son las diferentes secciones de tu negocio, como la cocina, el bar, el salón, etc. Cada área puede tener diferentes productos.",
    type: "video",
    path: "/img/Areas.mp4",
    format: "video/webm",
    icon: MdOutlineKitchen,
  },
  {
    title: "Categorias",
    description:
      "Son las diferentes clasificaciones de tus productos, como bebidas, alimentos, postres, etc. Cada producto puede tener una categoría.",
    type: "video",
    path: "/img/Categorias.mp4",
    alt: "video/webm",
    icon: GiFruitBowl,
  },
  {
    title: "Proveedores",
    description:
      "Son las empresas o personas que te suministran los productos que vendes. Puedes registrar sus datos y los productos que te suministran.",
      type: "video",
      path: "/img/Proveedor.mp4",
      alt: "video/webm",
    icon: FaBasketShopping,
  },
  // {
  //   title: "Ayuda",
  //   description:
  //     "Si tienes alguna duda o problema, puedes ver los tutoriales de la sección o contactar con nuestro equipo de soporte para recibir ayuda.",
  //   type: "video",
  //   path: "https://d3m8mk7e1mf7xn.cloudfront.net/app/newsletter.webm",
  //   format: "video/webm",
  //   icon: IoMdHelpCircle,
  // },
];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({ feature, isOpen, setFeatureSelected }) => {
  const accordion = useRef(null);
  const { title, description, icon: Icon } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-cute_blue font-bold text-left md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-100 ${isOpen ? "text-cute_purple" : ""}`}>
          <Icon className="w-6 h-6" />
        </span>
        <span
          className={`flex-1 text-base-content ${
            isOpen ? "text-cute_purple font-semibold" : ""
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

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }) => {
  const { type, path, format, alt } = feature;
  const style = "rounded-2xl aspect-square w-full sm:w-[26rem]";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
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

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <section
            className="flex flex-col justify-center items-center   md:px-10 py-24 md:py-32 space-y-24 md:space-y-32 max-w-8xl mx-auto bg-cute_white "
      id="features"
    >
      <div className="px-8">
      <h2 className="md:text-5xl text-4xl tracking-tight mb-12 md:mb-8 font-bold text-dark_purple text-center">
      Todo lo que necesitas para tu inventario{" "}
      <span className="block text-cute_blue md:px-8 md:leading-relaxed">
        y hacer crecer tu negocio
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
