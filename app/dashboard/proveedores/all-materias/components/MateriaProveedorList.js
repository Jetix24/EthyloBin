"use client"
import React, { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";
import AllMateriaPrimaBox from "./AllMateriaPrimaBox";

const MateriaProveedorList = () => {
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
    <div className="lg:pl-5">
      <div className="lg:pl-80 p-5 h-full">
      <h1 className="text-2xl font-bold mb-3 text-center sm:text-left">Todas las Materias Primas</h1>
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
            <AllMateriaPrimaBox 
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

export default MateriaProveedorList;
