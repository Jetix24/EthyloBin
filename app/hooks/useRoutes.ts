import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { FaBasketShopping } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { MdOutlineKitchen } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Zonas",
        href: "/dashboard/zonas",
        icon: MdOutlineKitchen,
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
