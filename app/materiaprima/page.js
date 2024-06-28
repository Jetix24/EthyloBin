"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const Home = () => {
  const [name, setName] = useState("");
  const [cantidad, setCantidad] = useState(0); // Nuevo campo
  const [zona, setZona] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [contable, setContable] = useState(true);
  const [medida, setMedida] = useState("unidades"); // Valor por defecto
  const [minimoAlmacen, setMinimoAlmacen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [zonas, setZonas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newMateriaPrima = {
        name,
        cantidad,
        zona: zona || null,
        categoria,
        proveedor: proveedor || null,
        contable,
        medida,
        minimoAlmacen,
      };

      console.log("Datos enviados:", newMateriaPrima);

      await apiClient.post("/materias-primas", newMateriaPrima);
      toast.success("Materia prima agregada exitosamente");
      // Reset form fields
      setName("");
      setCantidad(0);
      setZona("");
      setCategoria("");
      setProveedor("");
      setContable(true);
      setMedida("unidades"); // Restablecer a valor por defecto
      setMinimoAlmacen(0);
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar la materia prima");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow  sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
            <h3 className="text-lg font-semibold text-gray-900 ">
              Agregar Materia Prima
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
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
                {isLoading ? "Guardando..." : "Agregar Materia Prima"}
              </button>

              <button
                type="button"
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
        </div>
      </div>
    </div>
  );
};

export default Home;
