import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";

const ZoneBox = ({ zona }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleEdit = () => {
    console.log(`Editando ${zona.name}`);
    // Lógica de edición
  };

  const handleDelete = () => {
    console.log(`Eliminando ${zona.name}`);
    // Lógica de eliminación
  };

  return (
    <div className="flex justify-between items-center    my-2 p-2 border rounded bg-white">
      <div className="font-bold">{zona.name}</div>
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
  );
};

export default ZoneBox;
