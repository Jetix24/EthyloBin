"use client";

import { useParams } from "next/navigation";
import MateriaCategoriaList from "./components/MateriaCategoriaList";

const CategoriaDetail = () => {
  const { id } = useParams();

  return (
    <div className="lg:pl-80 pl-0">
      <MateriaCategoriaList categoriaId={id} />
    </div>
  );
};

export default CategoriaDetail;
