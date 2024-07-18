"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";
import AllMateriaBox from "./components/AllMateriaBox";
import clsx from "clsx";
import useZone from "@/app/hooks/useZone";

const Home = () => {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen } = useZone();

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      setIsLoading(true);
      try {
        const materiasData = await apiClient.get("/materias-primas");
        setMateriasPrimas(materiasData);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar materias primas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateriasPrimas();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setMateriasPrimas((prevMaterias) =>
      prevMaterias.map((materia) =>
        materia._id === id ? { ...materia, cantidad: newQuantity } : materia
      )
    );
  };

  return (
    <div className={clsx("pl-5", isOpen ? "hidden" : "block")}>
      <div className="pl-80 p-5 h-full">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : materiasPrimas.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <span className="text-gray-500">
              Parece que no tienes nada registrado
            </span>
          </div>
        ) : (
          <ul>
            {materiasPrimas.map((materia) => (
              <AllMateriaBox
                key={materia._id}
                materia={materia}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
