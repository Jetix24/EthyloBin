import { useParams } from "next/navigation";
import { useMemo } from "react";

const useCategoria = () => {
  const params = useParams();

  const categoriaId = useMemo(() => {
    if (!params?.id) {
      return "";
    }
    return params.id === "allmaterias" ? "allmaterias" : params.id;
  }, [params?.id]);

  const isOpen = useMemo(() => !!categoriaId, [categoriaId]);

  return {
    isOpen,
    categoriaId,
  };
};

export default useCategoria;
