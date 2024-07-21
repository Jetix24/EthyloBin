"use client"
import React, { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";
import MateriaProBox from "./MateriaProBox";

const MateriaZonaList = ({proveedorId}) => {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      setIsLoading(true);
      try {
        const materiasData = await apiClient.get(
          `/proveedores/${proveedorId}/materias-primas`
        );
        setMateriasPrimas(materiasData);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar materias primas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateriasPrimas();
  }, [proveedorId]);


  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">Materias Primas</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : materiasPrimas.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <span className="text-gray-500">
            Parece que no tienes nada registrado en este proovedor
          </span>
        </div>
      ) : (
        <ul>
          {materiasPrimas.map((materia) => (
            <MateriaProBox
              key={materia._id}
              materia={materia}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MateriaZonaList;
