"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/libs/api";
import clsx from "clsx";
import toast from "react-hot-toast";

const CategoriaDetail = ({ params }) => {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchMateriasPrimas = async () => {
        setIsLoading(true);
        try {
          const materiasData = await apiClient.get(
            `/api/categorias/${id}/materias-primas`
          );
          setMateriasPrimas(materiasData);
        } catch (error) {
          console.error(error);
          toast.error("Error al cargar las materias primas");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMateriasPrimas();
    }
  }, [id]);

  return (
    <div className={clsx("lg:pl-80 h-full lg:block", "block")}>
      <button
        onClick={() => router.push("/categorias")}
        className="mb-4 text-blue-500"
      >
        Volver a Categorías
      </button>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
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
    </div>
  );
};

export default CategoriaDetail;
