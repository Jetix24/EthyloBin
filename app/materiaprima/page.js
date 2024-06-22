"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const Home = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [zona, setZona] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [contable, setContable] = useState(true);
  const [medida, setMedida] = useState("");
  const [minimoAlmacen, setMinimoAlmacen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [zonas, setZonas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

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
      await apiClient.post("/materias-primas", {
        name,
        description,
        zona: zona || null,
        categoria,
        proveedor: proveedor || null,
        contable,
        medida,
        minimoAlmacen,
      });
      toast.success("Materia prima agregada exitosamente");
      // Reset form fields
      setName("");
      setDescription("");
      setZona("");
      setCategoria("");
      setProveedor("");
      setContable(true);
      setMedida("");
      setMinimoAlmacen(0);
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar la materia prima");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Materia Prima</h1>
      <p>Esta es la página de Materia Prima</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zona">Zona</label>
          <select
            id="zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
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
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
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
          <label htmlFor="proveedor">Proveedor</label>
          <select
            id="proveedor"
            value={proveedor}
            onChange={(e) => setProveedor(e.target.value)}
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
          <label htmlFor="contable">Contable</label>
          <input
            type="checkbox"
            id="contable"
            checked={contable}
            onChange={(e) => setContable(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="medida">Medida</label>
          <input
            type="text"
            id="medida"
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="minimoAlmacen">Mínimo en Almacén</label>
          <input
            type="number"
            id="minimoAlmacen"
            value={minimoAlmacen}
            onChange={(e) => setMinimoAlmacen(e.target.valueAsNumber)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Agregar Materia Prima"}
        </button>
      </form>
    </div>
  );
};

export default Home;
