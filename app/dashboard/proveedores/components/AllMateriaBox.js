import React from "react";

const MateriaProBox = ({ materia}) => {

  return (
    <div className="hidden lg:block">
    <div className="flex justify-between items-center my-2 p-2 border rounded bg-dark_white shadow-md">
      <div className="flex-1 flex items-center">
        <div className="text-2xl font-bold">{materia.name}</div>
      </div>
      <div className="font-bold">
        <h2 className="font-bold">{`Min: ${materia.minimoAlmacen}/Can: ${materia.cantidad+ materia.reserva}`}</h2>
      </div>    
    </div>
    </div>
  );
};

export default MateriaProBox;
