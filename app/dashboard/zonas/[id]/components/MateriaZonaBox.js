import React, { useState } from "react";
import apiClient from "@/libs/api";
import toast from "react-hot-toast";

const MateriaZonaBox = ({ materia, onQuantityChange, onReserveChange }) => {
  const [quantity, setQuantity] = useState(materia.cantidad);
  const [reserve, setReserve] = useState(materia.reserva || 0);
  const isContable = materia.contable;

  const handleQuantityChange = async (newQuantity) => {
    setQuantity(newQuantity);
    try {
      await apiClient.put(`/materias-primas/${materia._id}/cantidad`, {
        cantidad: newQuantity,
      });
      onQuantityChange(materia._id, newQuantity);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReserveChange = async (newReserve) => {
    setReserve(newReserve);
    try {
      await apiClient.put(`/materias-primas/${materia._id}/reserva`, {
        reserva: newReserve,
      });
      onReserveChange(materia._id, newReserve);
    } catch (error) {
      console.error(error);
    }
  };

  const incrementQuantity = () => {
    const increment = isContable ? 1 : 0.25; // Increment by 0.25 if not contable
    handleQuantityChange(quantity + increment);
    console.log("contable: " + isContable);
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

  return (
    <div className="flex justify-between items-center my-2 p-2 border rounded bg-white">
      <div className="flex-1 flex items-center">
        <div className="text-lg md:text-2xl font-bold">
          {materia.name} {materia.c}
        </div>
      </div>
      <form className="max-w-xs mx-auto flex items-center">
        <div className="relative flex flex-col-reverse md:flex-row items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={decrementQuantity}
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md p-3 h-5 md:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
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
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="bg-gray-50 border-x-0 border-gray-300 h-7 md:h-11 w-11 md:w-14 text-center text-cute_blue text-sm  min-w-2 md:min-w-5 block py-2.5 appearance-none"
            min="0"
          />
          <button
            type="button"
            id="increment-button"
            onClick={incrementQuantity}
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md p-3 h-5 md:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
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
        {/* Botón de Reserva */}
        <div className="relative flex flex-col-reverse md:flex-row items-center max-w-[8rem] ml-4">
          <button
            type="button"
            id="decrement-reserve-button"
            onClick={decrementReserve}
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md p-3 h-5 md:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
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
            value={reserve}
            onChange={(e) => handleReserveChange(Number(e.target.value))}
            className="bg-gray-50 border-x-0 border-gray-300 h-7 md:h-11 w-11 md:w-14 text-center text-cute_blue text-sm  min-w-2 md:min-w-5 block py-2.5 appearance-none"
            min="0"
          />
          <button
            type="button"
            id="increment-reserve-button"
            onClick={incrementReserve}
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md p-3 h-5 md:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
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
      </form>
    </div>
  );
};

export default MateriaZonaBox;
