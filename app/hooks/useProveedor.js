import { useParams } from "next/navigation";
import { useMemo } from "react";

const useProveedor = () => {
  const params = useParams();

  const proveedorId = useMemo(() => {
    if (!params?.id) {
      return "";
    }
    return params.id;
  }, [params?.id]);

  const isOpen = useMemo(() => !!proveedorId, [proveedorId]);

  return {
    isOpen,
    proveedorId,
  };
};

export default useProveedor;
