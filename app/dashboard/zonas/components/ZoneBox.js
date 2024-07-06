import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const ZoneBox = ({ zona, onEdit, onDelete }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newName, setNewName] = useState(zona.name);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/zonas/${zona._id}`);
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
      await apiClient.put("/zonas", { id: zona._id, name: newName });
      onEdit(zona._id, newName);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al editar la zona");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-2 p-2 border rounded bg-white">
        <div className="flex-1 cursor-pointer" onClick={handleClick}>
          <div className="font-bold">{zona.name}</div>
        </div>
        <Popover className="relative">
          <Popover.Button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="focus:outline-none flex items-center"
          >
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
        title="Editar Area"
      >
        <form onSubmit={handleEditSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre del Area
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Nombre del Area"
          />
          <button type="submit" className="mt-4 btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        title="Eliminar Area"
      >
        <p>
          ¿Estás seguro? Al eliminar esta zona, todos los elementos dentro de
          esta zona se quedarán sin zona.
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
              onDelete(zona._id);
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

export default ZoneBox;
