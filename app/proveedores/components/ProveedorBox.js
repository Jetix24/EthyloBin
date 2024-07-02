import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";

const ProveedorBox = ({ proveedor }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === `/proveedores/${proveedor._id}`;

  const handleClick = () => {
    router.push(`/proveedores/${proveedor._id}`);
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
          <Popover.Button className="focus:outline-none flex items-center">
            <BsThreeDots className="text-xl" />
          </Popover.Button>
          <Popover.Panel className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-2">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Editar
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Eliminar
              </button>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </>
  );
};

export default ProveedorBox;
