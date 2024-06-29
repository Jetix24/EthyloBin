import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import Modal from "@/components/Modal";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const MateriaPrimaBox = ({ materia, onEdit, onDelete }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [name, setName] = useState(materia.name);
  const [cantidad, setCantidad] = useState(materia.cantidad);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/materias-primas/${materia._id}`, {
        name,
        cantidad,
      });
      onEdit(materia._id, { name, cantidad });
      setIsEditModalOpen(false);
      toast.success("Materia prima actualizada");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la materia prima");
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/materias-primas/${materia._id}`);
      onDelete(materia._id);
      setIsDeleteModalOpen(false);
      toast.success("Materia prima eliminada");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la materia prima");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-2 p-2 border rounded bg-white">
        <div className="flex-1">
          <div className="font-bold">{materia.name}</div>
          <div>{`Cantidad: ${materia.cantidad}`}</div>
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
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setIsPopoverOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setIsPopoverOpen(false);
                  }}
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
        title="Editar Materia Prima"
      >
        <form onSubmit={handleEdit}>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre de la materia prima
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Nombre de la materia prima"
          />
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            Cantidad
          </label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Cantidad"
          />
          <button type="submit" className="mt-4 btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        title="Eliminar Materia Prima"
      >
        <p>
          ¿Estás seguro? Al eliminar esta materia prima, se perderán todos los
          datos asociados.
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="mr-4 btn btn-secondary"
          >
            Cancelar
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MateriaPrimaBox;
