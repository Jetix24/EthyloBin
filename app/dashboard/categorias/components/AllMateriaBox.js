import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import Modal from "@/components/Modal";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const AllMateriaPrimaBox = ({ materia, onEdit, onDelete }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [name, setName] = useState(materia.name);
  const [cantidad, setCantidad] = useState(materia.cantidad);
  const [zona, setZona] = useState(materia.zona || "");
  const [categoria, setCategoria] = useState(materia.categoria);
  const [proveedor, setProveedor] = useState(materia.proveedor || "");
  const [contable, setContable] = useState(materia.contable);
  const [medida, setMedida] = useState(materia.medida);
  const [minimoAlmacen, setMinimoAlmacen] = useState(materia.minimoAlmacen);
  const [zonas, setZonas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const contableOptions = [
    "unidades",
    "mililitros",
    "kilogramos",
    "gramos",
    "litros",
  ];
  const noContableOptions = ["frasco", "botella", "paquete"];

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [zonasData, categoriasData, proveedoresData] = await Promise.all([
          apiClient.get("/zonas"),
          apiClient.get("/categorias"),
          apiClient.get("/proveedores"),
        ]);
        setZonas(zonasData);
        setCategorias(categoriasData);
        setProveedores(proveedoresData);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar opciones");
      }
    };

    fetchOptions();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.put(`/materias-primas/${materia._id}`, {
        name,
        cantidad,
        zona,
        categoria,
        proveedor,
        contable,
        medida,
        minimoAlmacen,
      });
      onEdit(materia._id, {
        name,
        cantidad,
        zona,
        categoria,
        proveedor,
        contable,
        medida,
        minimoAlmacen,
      });
      setIsEditModalOpen(false);
      toast.success("Materia prima actualizada");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la materia prima");
    } finally {
      setIsLoading(false);
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
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 d"
                placeholder="Nombre de la materia prima"
              />
            </div>

            <div>
              <label
                htmlFor="categoria"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Categoría
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="zona"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Zona
              </label>
              <select
                id="zona"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              >
                <option value="">Seleccione una zona</option>
                {zonas.map((z) => (
                  <option key={z._id} value={z._id}>
                    {z.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="proveedor"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Proveedor
              </label>
              <select
                id="proveedor"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="contable"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Contable
              </label>
              <input
                type="checkbox"
                id="contable"
                checked={contable}
                onChange={(e) => setContable(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 "
              />
            </div>
            <div>
              <label
                htmlFor="medida"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Medida
              </label>
              <select
                id="medida"
                value={medida}
                onChange={(e) => setMedida(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="">Seleccione una medida</option>
                {contable
                  ? contableOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  : noContableOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="cantidad"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Cantidad actual en inventario
              </label>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.valueAsNumber)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Cantidad en inventario"
              />
            </div>
            <div>
              <label
                htmlFor="minimoAlmacen"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Mínimo en Almacén
              </label>
              <input
                type="number"
                id="minimoAlmacen"
                value={minimoAlmacen}
                onChange={(e) => setMinimoAlmacen(e.target.valueAsNumber)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Cantidad mínima en almacén"
              />
            </div>
          </div>
          <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto justify-center border-solid text-gray-500 hover:bg-gray-100 focus:ring-primary-300 border border-gray-200 hover:text-gray-900 focus:z-10 inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
            >
              <svg
                className="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 1.414 1.414L10 11.414l-4.293 4.293a1 1 1.414-1.414L8.586 10 4.293 5.707a1 1 0 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Descartar
            </button>
          </div>
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

export default AllMateriaPrimaBox;