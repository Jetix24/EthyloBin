import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { FaBasketShopping } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { MdKitchen } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Zonas",
        href: "/dashboard/zonas",
        icon: MdKitchen,
        active: pathname === "/dashboard/zonas" || !!pathname.match(/\/dashboard\/zonas\/\d+/),
      },
      {
        label: "Categorías",
        href: "/dashboard/categorias",
        icon: GiFruitBowl,
        active: pathname === "/dashboard/categorias" || !!pathname.match(/\/dashboard\/categorias\/\d+/),
      },
      {
        label: "Proveedores",
        href: "/dashboard/proveedores",
        icon: FaBasketShopping,
        active: pathname === "/dashboard/proveedores" || !!pathname.match(/\/dashboard\/proveedores\/\d+/),
      },
      {
        label: "Estadisticas",
        href: "/dashboard/estadisticas",
        icon: IoStatsChart,
        active: pathname === "/dashboard/estadisticas" || !!pathname.match(/\/dashboard\/estadisticas\/\d+/),
      },
            // {
      //   label: "Agregar Materia Prima",
      //   href: "/dashboard/materiaprima",
      //   icon: IoMdAddCircle,
      //   active: pathname === "/dashboard/materiaprima" || !!pathname.match(/\/dashboard\/materiaprima\/\d+/),
      // },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
