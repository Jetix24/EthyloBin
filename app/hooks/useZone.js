import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

const useZone = () => {
  const params = useParams();
  const pathname = usePathname();

  const zoneId = useMemo(() => {
    const pathParts = pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    if (lastPart === "all-materias") {
      return "all-materias";
    }
    if (!params?.id) {
      return "";
    }
    return params.id;
  }, [params?.id, pathname]);

  const isOpen = useMemo(() => !!zoneId, [zoneId]);

  return {
    isOpen,
    zoneId,
  };
};

export default useZone;
