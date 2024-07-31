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
      await apiClient.put(`/materias-primas?id=${materia._id}`, {
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
    setIsLoading(true);
    try {
      await apiClient.delete(`/materias-primas/${materia._id}`);
      onDelete(materia._id);
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      toast.success("Materia prima eliminada");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la materia prima");
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className=" flex justify-between items-center my-2 p-2 border rounded bg-white">
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
              <Popover.Panel className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
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
                  className="block mb-2 text-md font-medium text-blue_purple"
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
                  className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
                  placeholder="Nombre de la materia prima"
                />
              </div>

              <div>
                <label
                  htmlFor="categoria"
                  className="block mb-2 text-md font-medium text-blue_purple"
                >
                  Categoría
                </label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                  className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
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
                  className="block mb-2 text-md font-medium text-blue_purple"
                >
                  Zona
                </label>
                <select
                  id="zona"
                  value={zona}
                  onChange={(e) => setZona(e.target.value)}
                  className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
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
                  className="block mb-2 text-md font-medium text-blue_purple"
                >
                  Proveedor
                </label>
                <select
                  id="proveedor"
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                  className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
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
                  className="block mb-2 text-md font-medium text-blue_purple"
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
                  className="block mb-2 text-md font-medium text-blue_purple"
                >
                  Medida
                </label>
                <select
                  id="medida"
                  value={medida}
                  onChange={(e) => setMedida(e.target.value)}
                  required
                  className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
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
                  className="block mb-2 text-md font-medium text-blue_purple"
                >
                  Cantidad actual en inventario
                </label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.valueAsNumber)}
                  required
                  className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
                  placeholder="Cantidad en inventario"
                />
              </div>
              <div>
                <label
                  htmlFor="minimoAlmacen"
                  className="block mb-2 text-md font-medium text-blue_purple"
                >
                  Mínimo en Almacén
                </label>
                <input
                  type="number"
                  id="minimoAlmacen"
                  value={minimoAlmacen}
                  onChange={(e) => setMinimoAlmacen(e.target.valueAsNumber)}
                  required
                  className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
                  placeholder="Cantidad mínima en almacén"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row md:justify-end mt-4 justify-center w-full">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="mb-4 sm:mb-0 sm:mr-4 btn text-cute_white bg-cute_blue hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn text-cute_white bg-cute_purple hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md min-w-[120px] "
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
          title="Eliminar Materia Prima"
        >
          <p>
            ¿Estás seguro? Al eliminar esta materia prima, se perderán todos los
            datos asociados.
          </p>
          <div className="flex flex-col sm:flex-row md:justify-end mt-4 justify-center w-full">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="mr-4 btn text-cute_white bg-cute_blue hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="btn text-cute_white bg-cute_purple hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md min-w-[120px] md:mb-0 mb-8"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Eliminar"
              )}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AllMateriaPrimaBox;
