import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { LuWarehouse } from "react-icons/lu";
import { FaBucket } from "react-icons/fa6";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Almacen",
        href: "/dashboard/almacen",
        icon: LuWarehouse,
        active: pathname === "/dashboard/almacen" || !!pathname.match(/\/dashboard\/almacen\/\d+/),
      },
      {
        label: "Composta",
        href: "/dashboard/composta",
        icon: FaBucket,
        active: pathname === "/dashboard/composta" || !!pathname.match(/\/dashboard\/composta\/\d+/),
      },

    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
