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
    "onzas",
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

  function resetInputs() {
    setName("");
    setCantidad(0);
    setZona("");
    setCategoria("");
    setProveedor("");
    setContable(true);
    setMedida("unidades"); // Restablecer a valor por defecto
    setMinimoAlmacen(0);
  }

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
    <div className="fixed inset-0 flex items-center justify-center bg-dark_purple bg-opacity-70">
      <div className="relative p-4 w-full max-w-3xl h-full md:h-auto overflow-auto">
        <div className="relative p-4 bg-cute_white rounded-md shadow sm:p-5  md:mb-0 mb-4 ">
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
                onClick={() => resetInputs()}
                className="mb-4 sm:mb-0 sm:mr-4 btn text-cute_white bg-cute_blue hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md"
              >
                Descartar
              </button>
              <button 
                type="submit" 
                  className="btn text-cute_white bg-cute_purple hover:bg-blue_purple flex-grow md:flex-grow-0 rounded-md min-w-[120px] md:mb-0 mb-8"
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
        </div>
      </div>
    </div>
  );
};

export default Home;
