"use client";

import React, { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";
import MateriaPrimaBox from "./MateriaPrimaBox";

const MateriaCategoriaList = ({categoriaId}) => {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      setIsLoading(true);
      try {
        const materiasData = await apiClient.get(
          `/categorias/${categoriaId}/materias-primas`
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
  }, [categoriaId]);

  const handleEdit = (materiaId, updatedData) => {
    setMateriasPrimas((prevMaterias) =>
      prevMaterias.map((materia) =>
        materia._id === materiaId ? { ...materia, ...updatedData } : materia
      )
    );
  };

  const handleDelete = (materiaId) => {
    setMateriasPrimas((prevMaterias) =>
      prevMaterias.filter((materia) => materia._id !== materiaId)
    );
  };

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
                Parece que no tienes nada registrado en esta categoria
              </span>
            </div>
          ) : (
          <ul>
            {materiasPrimas.map((materia) => (
              <MateriaPrimaBox
                key={materia._id}
                materia={materia}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
    </div>
  );
};

export default  MateriaCategoriaList;
