import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import Modal from "@/components/Modal";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const ProveedorBox = ({ proveedor, onEdit, onDelete  }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === `/proveedores/${proveedor._id}`;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newName, setNewName] = useState(proveedor.name);

  const handleClick = () => {
    router.push(`/dashboard/proveedores/${proveedor._id}`);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
    setIsPopoverOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
    setIsPopoverOpen(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put("/proveedores", { id: proveedor._id, name: newName });
      onEdit(proveedor._id, newName);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al editar el proveedor");
    }
  };

  return (
    <>
      <div
        className={`flex justify-between items-center my-2 p-2 border rounded cursor-pointer hover:bg-slate-300 ${
          isActive ? "bg-blue-200" : "bg-white"
        }`}
        onClick={handleClick}
      >
        <div className="flex-1">
          <div className="font-bold">{proveedor.name}</div>
        </div>
        <Popover className="relative">
          <Popover.Button 
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="focus:outline-none flex items-center">
            <BsThreeDots className="text-xl" />
          </Popover.Button>
          {isPopoverOpen && (
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-2">
                <button
                  onClick={handleEdit}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Eliminar
                </button>
              </div>
            </Popover.Panel>
          )}
        </Popover>
      </div>

      <Modal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        title="Editar Proveedor"
      >
        <form onSubmit={handleEditSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre del proveedor
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Nombre del proveedor"
          />
          <button type="submit" className="mt-4 btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        title="Eliminar proveedor"
      >
        <p>
          ¿Estás seguro? Al eliminar este proveedor, todos los elementos dentro de
          este proveedor se quedarán sin proveedor.
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="mr-4 btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onDelete(proveedor._id);
              setIsDeleteModalOpen(false);
            }}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProveedorBox;
