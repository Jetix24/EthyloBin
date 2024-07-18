"use client";

import { useParams } from "next/navigation";
import MateriaZonaList from "./components/MateriaZonaList";

const ZonaDetail = () => {
  const { id } = useParams();

  return (
    <div className="lg:pl-80 pl-0">
      <MateriaZonaList zonaId={id} />
    </div>
  );
};

export default ZonaDetail;
