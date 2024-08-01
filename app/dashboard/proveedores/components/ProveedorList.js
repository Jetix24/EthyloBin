"use client";
import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import ProveedorBox from "./ProveedorBox";
import clsx from "clsx";
import useProveedor from "@/app/hooks/useProveedor";
import { useRouter, usePathname } from "next/navigation";
import { IoMdAddCircle } from "react-icons/io";

const ProveedorList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [activeProveedorId, setActiveProveedorId] = useState(null);
  const { isOpen } = useProveedor();

  useEffect(() => {
    const fetchProveedores = async () => {
      setIsLoading(true);
      try {
        const proveedoresData = await apiClient.get("/proveedores");
        setProveedores(proveedoresData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProveedores();
  }, []);

  const handleProveedorClick = (proveedorId) => {
    setActiveProveedorId(proveedorId);
    router.push(`/dashboard/proveedores/${proveedorId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { newProveedor } = await apiClient.post("/proveedores", { name });
      toast.success("Proveedor creado");
      setProveedores([...proveedores, newProveedor]);
      setName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id, newName) => {
    setProveedores((prevProvedores) =>
      prevProvedores.map((proveedor) =>
        proveedor._id === id ? { ...proveedor, name: newName } : proveedor      )
    );
    toast.success("Proveedor actualizado");
  };

  const handleDelete = async (id) => {
    setProveedores((prevProvedores) => prevProvedores.filter((proveedor) => proveedor._id !== id));
    toast.success("Proveedor eliminado");
  };

  const isActiveAll = pathname === "/dashboard/proveedores";
  
  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Crear nuevo proveedor"
      >
        <form onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-md font-medium text-blue_purple"
            >
              Nombre del proveedor
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
              placeholder="Escribe el nombre del proveedor"
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
                "Crear proveedor"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <aside 
      className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
        isOpen ? "hidden" : "block w-full left-0 "
      )}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Proveedores</div>
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
              {proveedores.map((proveedor) => (
                <ProveedorBox 
                  key={proveedor._id} 
                  proveedor={proveedor} 
                  isActive={proveedor._id === activeProveedorId}
                  onClick={() => handleProveedorClick(proveedor._id)}
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

export default ProveedorList;
