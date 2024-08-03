"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";
import AllMateriaBox from "./components/AllMateriaBox";

const Home = () => {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      setIsLoading(true);
      try {
        const materiasData = await apiClient.get("/materias-primas");
        const filteredMaterias = materiasData.filter(materia => materia.cantidad < materia.minimoAlmacen);
        setMateriasPrimas(filteredMaterias);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar materias primas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateriasPrimas();
  }, []);

  return (
    <div className="pl-5">
      <div className="pl-80 p-5 h-full">
        <h1 className="text-2xl font-bold mb-3 hidden lg:block">Todas las Materias Primas</h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md hidden lg:block"></span>
          </div>
          ) : materiasPrimas.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <span className="text-gray-500 hidden lg:block">
                Parece que no tienes nada registrado
              </span>
            </div>
        ) : (
          <ul>
            {materiasPrimas.map((materia) => (
              <AllMateriaBox
                key={materia._id}
                materia={materia}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;