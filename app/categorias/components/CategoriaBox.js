"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";

const CategoriaBox = ({ categoria }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const materiasData = await apiClient.get(
        `/categorias/${categoria._id}/materias-primas`
      );
      setMateriasPrimas(materiasData);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las materias primas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer my-2 p-2 border rounded hover:bg-gray-100"
    >
      <div className="font-bold">{categoria.name}</div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={`Materias Primas de ${categoria.name}`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <ul>
            {materiasPrimas.map((materiaPrima) => (
              <li key={materiaPrima._id} className="my-2 p-2 border rounded">
                {materiaPrima.name}
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default CategoriaBox;
