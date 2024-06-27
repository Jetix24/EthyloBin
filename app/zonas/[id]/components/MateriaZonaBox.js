import React, { useState } from "react";

const MateriaZonaBox = ({ materia }) => {
  return (
    <>
      <div className="flex justify-between items-center my-2 p-2 border rounded bg-white">
        <div className="flex-1">
          <div className="text-2xl font-bold">{materia.name}</div>
        </div>
      </div>
    </>
  );
};

export default MateriaZonaBox;
