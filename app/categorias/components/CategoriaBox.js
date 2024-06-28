"use client";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import Modal from "@/components/Modal";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CategoriaBox = ({ categoria, onEdit, onDelete }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [name, setName] = useState(categoria.name);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/api/categorias/${categoria._id}`, { name });
      onEdit(categoria._id, name);
      setIsEditModalOpen(false);
      toast.success("Categoría actualizada");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la categoría");
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/categorias/${categoria._id}`);
      onDelete(categoria._id);
      setIsDeleteModalOpen(false);
      toast.success("Categoría eliminada");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la categoría");
    }
  };

  const handleClick = () => {
    router.push(`/categorias/${categoria._id}`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex justify-between items-center my-2 p-2 border rounded bg-white hover:bg-gray-100"
      >
        <div className="flex-1 cursor-pointer">
          <div className="font-bold">{categoria.name}</div>
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
        title="Editar Categoría"
      >
        <form onSubmit={handleEdit}>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre de la categoría
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Nombre de la categoría"
          />
          <button type="submit" className="mt-4 btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        title="Eliminar Categoría"
      >
        <p>
          ¿Estás seguro? Al eliminar esta categoría, todas las materias primas
          asociadas quedarán sin categoría.
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

export default CategoriaBox;
