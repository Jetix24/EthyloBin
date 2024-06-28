"use client";
import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import CategoriaBox from "./CategoriaBox";

const CategoriaList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      setIsLoading(true);
      try {
        const categoriasData = await apiClient.get("/categorias");
        setCategorias(categoriasData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { newCategoria } = await apiClient.post("/api/categorias", {
        name,
      });
      toast.success("Categoría creada");
      setCategorias([...categorias, newCategoria]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id, newName) => {
    setCategorias((prevCategorias) =>
      prevCategorias.map((categoria) =>
        categoria._id === id ? { ...categoria, name: newName } : categoria
      )
    );
  };

  const handleDelete = (id) => {
    setCategorias((prevCategorias) =>
      prevCategorias.filter((categoria) => categoria._id !== id)
    );
  };

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Crear nueva categoría"
      >
        <form onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre de la categoría
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Escribe el nombre de la categoría"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              disabled={isLoading}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Crear categoría"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200">
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">
              Categorías
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <ul>
              {categorias.map((categoria) => (
                <CategoriaBox
                  key={categoria._id}
                  categoria={categoria}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="absolute bottom-0 w-full p-4 bg-gray-100 flex justify-center items-center">
          <div onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            Agregar Categoría
          </div>
        </div>
      </aside>
    </>
  );
};

export default CategoriaList;
