"use client";
import { useParams } from "next/navigation";
import MateriaProList from "./components/MaterialProList";

const ProveedorDetail = () => {
  const { id } = useParams();

  return (
    <div className="pl-80">
      <MateriaProList proveedorId={id} />
    </div>
  );
};

export default ProveedorDetail;
