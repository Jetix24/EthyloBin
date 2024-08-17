"use client";
import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import Modal from "@/components/Common/modals/Modal";
import toast from "react-hot-toast";
import CategoriaBox from "./CategoriaBox";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import useCategoria from "@/app/hooks/useCategoria";
import { IoMdAddCircle } from "react-icons/io";
import AllMateriaBox from "./AllMateriaBox";

const CategoriaList = () => {
  const { isOpen, isAllMateriasActive } = useCategoria();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [activeCategoriaId, setActiveCategoriaId] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      setIsLoading(true);
      try {
        const categoriasData = await apiClient.get("/categorias");
        setCategorias(categoriasData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleCategoriaClick = (categoriaId) => {
    setActiveCategoriaId(categoriaId);
    router.push(`/dashboard/categorias/${categoriaId}`);
  };

  const handleMateriaClick = () => {
    setActiveCategoriaId("all-materias");
    router.push(`/dashboard/categorias/all-materias`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { newCategoria } = await apiClient.post("/categorias", { name });
      toast.success("Categoría creada");
      setCategorias([...categorias, newCategoria]);
      setName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id, newName) => {
    setCategorias((prevCategorias) =>
      prevCategorias.map((categoria) =>
        categoria._id === id ? { ...categoria, name: newName } : categoria
      )
    );
    toast.success("Categoria actualizada");
  };

  const handleDelete = async (id) => {
    setCategorias((prevCategorias) => prevCategorias.filter((categoria) => categoria._id !== id));
    toast.success("Categoria eliminada");
  };

  const isActiveAll = pathname === "/dashboard/categorias";

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Crear nueva categoría"
      >
        <form onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-md font-medium text-blue_purple"
            >
              Nombre de la categoría
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`bg-white  text-blue_purple  border-cute_blue border-2 text-sm rounded-md block w-full p-2.5`}
              placeholder="Escribe el nombre de la categoría"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full sm:w-auto text-cute_white btn bg-cute_purple hover:bg-blue_purple rounded-md min-w-[120px]"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Crear categoría"
              )}
            </button>
          </div>
        </form>
      </Modal>

      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0 "
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-dark_purple">Categorías</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative
              inline-block
              rounded-full
              overflow-hidden
              text-cute_purple
              hover:text-cute_blue
              cursor-pointer
              transition-colors 
              duration-400"
            >
              <IoMdAddCircle size={32} />
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <ul>
              {categorias.length > 0 && (
                <div
                  className={`block lg:hidden justify-between items-center my-2 p-2 border rounded cursor-pointer transition-colors duration-400 ease-in-out hover:bg-cute_blue hover:text-cute_white shadow ${
                    isActiveAll && isAllMateriasActive ? "bg-cute_purple text-white" : "bg-dark_white"
                  }`}
                  onClick={handleMateriaClick}
                >
                  <div className="flex-1 cursor-pointer">
                    <div className="font-bold">Todas las materias</div>
                  </div>
                </div>
              )}
              
              {categorias.map((categoria) => (
                <CategoriaBox 
                  key={categoria._id} 
                  categoria={categoria}  
                  isActive={categoria._id === activeCategoriaId}
                  onClick={() => handleCategoriaClick(categoria._id)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}  />
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default CategoriaList;
