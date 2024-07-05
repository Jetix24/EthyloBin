import React, { useState } from "react";
import apiClient from "@/libs/api";

const MateriaProBox = ({ materia, onQuantityChange, bgcolor }) => {
  const [quantity, setQuantity] = useState(materia.cantidad);

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

  const incrementQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      handleQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex justify-between items-center my-2 p-2 border rounded bg-white">
      <div className="flex-1 flex items-center">
        <div className="text-2xl font-bold">{materia.name}</div>
      </div>
      <form className="max-w-xs mx-auto flex items-center">
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={decrementQuantity}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
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
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 appearance-none"
            min="0"
          />
          <button
            type="button"
            id="increment-button"
            onClick={incrementQuantity}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
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
