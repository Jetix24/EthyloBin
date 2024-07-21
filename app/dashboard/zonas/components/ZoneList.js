"use client";
import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import ZoneBox from "./ZoneBox";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import useZone from "@/app/hooks/useZone";
import { IoMdAddCircle } from "react-icons/io";

const ZoneList = () => {
  const router = useRouter();
  const { isOpen } = useZone(); // Importamos el hook useZone
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zonas, setZonas] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeZonaId, setActiveZonaId] = useState(null);
  const pathname = usePathname();

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

  const handleZonaClick = (zonaId) => {
    setActiveZonaId(zonaId);
    router.push(`/dashboard/zonas/${zonaId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { newZona } = await apiClient.post("/zonas", { name });
      toast.success("Área creada");
      setZonas([...zonas, newZona]);
      setName(""); // Limpiar el input antes de cerrar el modal
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id, newName) => {
    setZonas((prevZonas) =>
      prevZonas.map((zona) =>
        zona._id === id ? { ...zona, name: newName } : zona
      )
    );
    toast.success("Zona actualizada");
  };

  const handleDelete = async (id) => {
    setZonas((prevZonas) => prevZonas.filter((zona) => zona._id !== id));
    toast.success("Zona eliminada");
  };

  const isActiveAll = pathname === "/dashboard/zonas";

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Crear nueva Área"
      >
        <form onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-md font-medium text-blue_purple"
            >
              Nombre del área
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
              placeholder="Escribe el nombre del área"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full sm:w-auto text-cute_white btn bg-cute_purple hover:bg-blue_purple rounded-md min-w-[120px]"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Crear área"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0 "
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Áreas</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative
              inline-block
              rounded-full
              overflow-hidden
              text-cute_purple
              hover:text-cute_blue
              cursor-pointer
              transition-colors 
              duration-400"

            >
              <IoMdAddCircle size={32} />
            </div>
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
                  isActive={zona._id === activeZonaId}
                  onClick={() => handleZonaClick(zona._id)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default ZoneList;
