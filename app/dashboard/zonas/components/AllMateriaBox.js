import React, { useState } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const AllMateriaBox = ({ materia, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(materia.cantidad);
  const [reserve, setReserve] = useState(materia.reserva || 0);
  const isContable = materia.contable;

  const handleQuantityChange = async (newQuantity) => {
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      try {
        await apiClient.put(`/materias-primas/${materia._id}/cantidad`, {
          cantidad: newQuantity,
        });
        onQuantityChange(materia._id, newQuantity);
      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar la cantidad");
      }
    }
  };

  const handleReserveChange = async (newReserve) => {
    if (!isNaN(newReserve)) {
      setReserve(newReserve);
      try {
        await apiClient.put(`/materias-primas/${materia._id}/reserva`, {
          reserva: newReserve,
        });
        onQuantityChange(materia._id, newReserve);
      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar la reserva");
      }
    }
  };

  const incrementQuantity = () => {
    const increment = isContable ? 1 : 0.25; // Increment by 0.25 if not contable
    handleQuantityChange(quantity + increment);
  };

  const decrementQuantity = () => {
    const decrement = isContable ? 1 : 0.25; // Decrement by 0.25 if not contable
    if (quantity > 0) {
      handleQuantityChange(quantity - decrement);
    }
  };

  const incrementReserve = () => {
    const increment = isContable ? 1 : 0.25; // Increment by 0.25 if not contable
    handleReserveChange(reserve + increment);
  };

  const decrementReserve = () => {
    const decrement = isContable ? 1 : 0.25; // Decrement by 0.25 if not contable
    if (reserve > 0) {
      handleReserveChange(reserve - decrement);
    }
  };

  const formatFraction = (value) => {
    if (isContable) return value;

    switch (value) {
      case 0.25:
        return "¼";
      case 0.5:
        return "½";
      case 0.75:
        return "¾";
      default:
        return value;
    }
  };

  return (
    <div className="hidden lg:block">
      <div className="flex justify-between items-center my-2 p-2 border rounded bg-dark_white">
        <div className="flex-1 flex items-center">
          <div className="text-2xl font-bold">{materia.name}</div>
        </div>
        <form className="max-w-xs mx-auto flex items-center">
          <div>
            <div className="text-xs text-gray-500 mb-1 md:mb-0 text-center">
              En uso
            </div>
            <div className="relative flex flex-col-reverse md:flex-row items-center max-w-[8rem]">
              <button
                type="button"
                id="decrement-button"
                onClick={decrementQuantity}
                className="flex items-center justify-center bg-cute_purple hover:bg-blue_purple rounded-b-lg md:rounded-none md:rounded-s-lg p-4 h-5 md:h-11 md:p-3"
              >
                <svg
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="quantity-input"
                value={formatFraction(quantity)}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 appearance-none"
                min="0"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <button
                type="button"
                id="increment-button"
                onClick={incrementQuantity}
                className="flex items-center justify-center bg-cute_blue hover:bg-blue_purple rounded-t-lg md:rounded-none md:rounded-e-lg p-4 h-5 md:h-11 md:p-3"
              >
                <svg
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {isContable
                ? quantity > 1
                  ? `${materia.medida}`
                  : materia.medida
                : quantity > 1
                ? `${materia.medida}s`
                : `de ${materia.medida}`}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-xs text-gray-500 mb-1 md:mb-0 text-center">
              Reserva
            </div>
            <div className="relative flex flex-col-reverse md:flex-row items-center max-w-[8rem] ">
              <button
                type="button"
                id="decrement-reserve-button"
                onClick={decrementReserve}
               className="flex items-center justify-center bg-cute_purple hover:bg-blue_purple rounded-b-lg md:rounded-none md:rounded-s-lg p-4 h-5 md:h-11 md:p-3"
              >
                <svg
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="reserve-input"
                value={formatFraction(reserve)}
                onChange={(e) => handleReserveChange(Number(e.target.value))}
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 appearance-none"
                min="0"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <button
                type="button"
                id="increment-reserve-button"
                onClick={incrementReserve}
               className="flex items-center justify-center bg-cute_blue hover:bg-blue_purple rounded-t-lg md:rounded-none md:rounded-e-lg p-4 h-5 md:h-11 md:p-3"
              >
                <svg
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {isContable
                ? reserve > 1
                  ? `${materia.medida}`
                  : materia.medida
                : reserve > 1
                ? `${materia.medida}s`
                : `de ${materia.medida}`}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllMateriaBox;
