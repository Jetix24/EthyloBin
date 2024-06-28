"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const CategoriaDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      setIsLoading(true);
      try {
        const materiasData = await apiClient.get(
          `/categorias/${id}/materias-primas`
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
    <div className="pl-5">
      <div className="pl-80 p-5 h-full">
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoriaDetail;
