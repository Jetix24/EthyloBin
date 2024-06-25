"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const ZonaDetail = () => {
  const { id } = useParams();
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      setIsLoading(true);
      try {
        const materiasData = await apiClient.get(
          `/zonas/${id}/materias-primas`
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
  }, [id]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Materias Primas</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <ul>
          {materiasPrimas.map((materia) => (
            <li key={materia._id} className="my-2 p-2 border rounded">
              <div className="font-bold">{materia.name}</div>
              <div>{materia.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ZonaDetail;
