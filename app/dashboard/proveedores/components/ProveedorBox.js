import React, { useState } from "react";
import { useRouter} from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import Modal from "@/components/Common/modals/Modal";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const ProveedorBox = ({ proveedor, onEdit, onDelete, isActive, onClick }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newName, setNewName] = useState(proveedor.name);
  const router = useRouter();

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
    setIsLoading(true);
    try {
      await apiClient.put("/proveedores", { id: proveedor._id, name: newName });
      onEdit(proveedor._id, newName);
      setIsEditModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al editar el proveedor");
    }
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await apiClient.delete(`/proveedores?id=${proveedor._id}`);
      onDelete(proveedor._id);
      setIsLoading(true);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar al proveedor");
    }
  };

  return (
    <>
      <div
        className={`flex justify-between items-center my-2 p-2 border rounded cursor-pointer transition-colors duration-400 ease-in-out hover:bg-cute_blue hover:text-cute_white ${
          isActive ? "bg-cute_purple text-white" : "bg-white"
        }`}
        onClick={onClick}
      >
        <div className="flex-1" onClick={handleClick}>
          <div className="font-bold">{proveedor.name}</div>
        </div>
        <Popover className="relative">
          <Popover.Button 
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="focus:outline-none flex items-center">
            <BsThreeDots className="text-xl" />
          </Popover.Button>
          {isPopoverOpen && (
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
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
        <label className="block mb-2 text-md font-medium text-blue_purple">
            Nombre del proveedor
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
            placeholder="Nombre del proveedor"
          />
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="mt-4 w-full sm:w-auto min-w-[120px] text-cute_white btn bg-cute_purple hover:bg-blue_purple rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Guardar cambios"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        title="Eliminar proveedor"
      >
        <p className="text-md ">
          ¿Estás seguro? Al eliminar este proveedor, todos los elementos dentro de
          este proveedor se quedarán sin proveedor.
        </p>
        <div className="flex md:justify-end mt-4 justify-center w-full">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
             className="mr-4 btn text-cute_white bg-cute_blue hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteConfirm}
            disabled={isLoading}
            className="btn text-cute_white bg-cute_purple hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md min-w-[120px]"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProveedorBox;
