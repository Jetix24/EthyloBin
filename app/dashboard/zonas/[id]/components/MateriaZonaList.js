import React, { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";
import MateriaZonaBox from "./MateriaZonaBox";

const MateriaZonaList = ({ zonaId }) => {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      setIsLoading(true);
      try {
        const materiasData = await apiClient.get(
          `/zonas/${zonaId}/materias-primas`
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
  }, [zonaId]);

  const handleQuantityChange = (id, newQuantity) => {
    setMateriasPrimas((prevMaterias) =>
      prevMaterias.map((materia) =>
        materia._id === id ? { ...materia, cantidad: newQuantity } : materia
      )
    );
  };

  const handleReserveChange = (id, newReserve) => {
    setMateriasPrimas((prevMaterias) =>
      prevMaterias.map((materia) =>
        materia._id === id ? { ...materia, reserva: newReserve } : materia
      )
    );
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3 text-center sm:text-left">
        Materias Primas
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : materiasPrimas.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <span className="text-gray-500">
            Parece que no tienes nada registrado en esta zona
          </span>
        </div>
      ) : (
        <ul>
          {materiasPrimas.map((materia, index) => (
            <MateriaZonaBox
              key={materia._id}
              materia={materia}
              onQuantityChange={handleQuantityChange}
              onReserveChange={handleReserveChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MateriaZonaList;
