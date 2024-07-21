"use client";
import { useParams } from "next/navigation";
import MateriaProList from "./components/MaterialProList";

const ProveedorDetail = () => {
  const { id } = useParams();

  return (
    <div className="lg:pl-80 pl-0">
      <MateriaProList proveedorId={id} />
    </div>
  );
};

export default ProveedorDetail;
