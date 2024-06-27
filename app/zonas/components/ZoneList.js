"use client";
import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import ZoneBox from "./ZoneBox";

const ZoneList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zonas, setZonas] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchZonas = async () => {
      setIsLoading(true);
      try {
        const zonasData = await apiClient.get("/zonas");
        setZonas(zonasData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchZonas();
  }, []);

  const handleEdit = async (id, newName) => {
    setZonas((prevZonas) =>
      prevZonas.map((zona) =>
        zona._id === id ? { ...zona, name: newName } : zona
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/zonas/${id}`);
      setZonas((prevZonas) => prevZonas.filter((zona) => zona._id !== id));
      toast.success("Zona eliminada");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la zona");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { newZona } = await apiClient.post("/zonas", { name });
      toast.success("Area creada");
      setZonas([...zonas, newZona]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Crear nueva Area"
      >
        <form onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre del area
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Escribe el nombre del area"
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
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Crear area"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200">
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Areas</div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <ul>
              {zonas.map((zona) => (
                <ZoneBox
                  key={zona._id}
                  zona={zona}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="absolute bottom-0 w-full p-4 bg-gray-100 flex justify-center items-center">
          <div onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            Agregar Area
          </div>
        </div>
      </aside>
    </>
  );
};

export default ZoneList;
