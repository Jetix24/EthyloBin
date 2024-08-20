"use client";
import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import Modal from "@/components/Common/modals/Modal";
import toast from "react-hot-toast";
import ProveedorBox from "./ProveedorBox";
import clsx from "clsx";
import useProveedor from "@/app/hooks/useProveedor";
import { useRouter, usePathname } from "next/navigation";
import { jsPDF } from "jspdf";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";

const ProveedorList = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [activeProveedorId, setActiveProveedorId] = useState(null);
  const { isOpen, isAllMateriasActive } = useProveedor();

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

  const handleMateriaClick = () => {
    setActiveProveedorId("all-materias");
    router.push(`/dashboard/proveedores/all-materias`);
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
      setIsPopoverOpen(false);
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

  const generatePDF = async () => {
    const doc = new jsPDF();
    let currentY = 20;
    doc.text("Lista de Compras", 10, 10);
    try {
      const proveedoresData = await apiClient.get("/proveedores");
      for (const proveedor of proveedoresData) {
        const materiasData = await apiClient.get(`/proveedores/${proveedor._id}/materias-primas`);
        const filteredMaterias = materiasData.filter(
          (materia) => materia.cantidad + materia.reserva < materia.minimoAlmacen
        );
        if (filteredMaterias.length > 0) {
          doc.text(`${proveedor.name}:`, 10, currentY);
          currentY += 10;
                   filteredMaterias.forEach((materia, index) => {
            doc.rect(20, currentY-5, 5, 5);
            doc.text(
              `${materia.name}`, 30, currentY
            );
            currentY += 8;
          });
          currentY += 5;
        }
      }
      doc.save("lista_compras.pdf");
      setIsPopoverOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
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
            <div className="flex space-x-4">
               <Popover className="relative">
                <Popover.Button 
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="focus:outline-none pt-2 flex items-center">
                  <BsThreeDots className="text-xl" />
                </Popover.Button>
                {isPopoverOpen && (
                  <Popover.Panel className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-2">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Crear Proveedor
                      </button>
                      <button
                        onClick={generatePDF}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Generar Lista
                      </button>
                    </div>
                  </Popover.Panel>
                )}
              </Popover>      
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <ul>
              {proveedores.length > 0 && (
                <div
                  className={`block lg:hidden justify-between items-center my-2 p-2 border rounded cursor-pointer transition-colors duration-400 ease-in-out hover:bg-cute_blue hover:text-cute_white shadow ${
                    isActiveAll && isAllMateriasActive ? "bg-cute_purple text-white" : "bg-dark_white"
                  }`}
                  onClick={handleMateriaClick}
                >
                  <div className="flex-1 cursor-pointer">
                    <div className="font-bold">Todas las materias</div>
                  </div>
                </div>
              )}
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