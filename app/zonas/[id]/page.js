"use client";

import { useParams } from "next/navigation";
import MateriaZonaList from "./components/MateriaZonaList";

const ZonaDetail = () => {
  const { id } = useParams();

  return (
    <div className="pl-80">
      <MateriaZonaList zonaId={id} />
    </div>
  );
};

export default ZonaDetail;
