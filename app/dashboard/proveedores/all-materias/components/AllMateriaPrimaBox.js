import React from "react";

const MateriaProBox = ({ materia}) => {

  return (
    <div className="flex justify-between items-center my-2 p-2 border rounded bg-white">
      <div className="flex-1 flex items-center">
        <div className="text-lg md:text-2xl font-bold">{materia.name}</div>
      </div>
      <div className="font-bold">
        <h2 className="font-bold">{`Min: ${materia.minimoAlmacen}/Can: ${materia.cantidad}`}</h2>
      </div>
      
    </div>
  );
};

export default MateriaProBox;
