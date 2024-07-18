import { useParams } from "next/navigation";
import { useMemo } from "react";

const useZone = () => {
  const params = useParams();

  const zoneId = useMemo(() => {
    if (!params?.id) {
      return "";
    }
    return params.id;
  }, [params?.id]);

  const isOpen = useMemo(() => !!zoneId, [zoneId]);

  return {
    isOpen,
    zoneId,
  };
};

export default useZone;
