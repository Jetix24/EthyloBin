import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import Modal from "@/components/Modal";

const ZoneBox = ({ zona, isActive, onClick }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
    setIsPopoverOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
    setIsPopoverOpen(false);
  };

  return (
    <>
      <div
        className={`flex justify-between items-center my-2 p-2 border rounded cursor-pointer hover:bg-slate-200 ${
          isActive ? "bg-slate-400 text-white" : "bg-white"
        }`}
        onClick={onClick}
      >
        <div className="flex-1">
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
        title="Editar Zona"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEdit(zona._id);
            setIsEditModalOpen(false);
          }}
        >
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre de la zona
          </label>
          <input
            type="text"
            defaultValue={zona.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Nombre de la zona"
          />
          <button type="submit" className="mt-4 btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        title="Eliminar Zona"
      >
        <p>
          ¿Estás seguro?
          <br />
          Al eliminar esta zona, todos los elementos dentro de esta zona se
          quedarán sin zona.
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
