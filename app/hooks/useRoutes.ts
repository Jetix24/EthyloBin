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
        label: "Agregar Materia Prima",
        href: "/materiaprima",
        icon: IoMdAddCircle,
        active:
          pathname === "/materiaprima" ||
          !!pathname.match(/\/materiaprima\/\d+/),
      },
      {
        label: "Zonas",
        href: "/zonas",
        icon: MdOutlineKitchen,
        active: pathname === "/zonas" || !!pathname.match(/\/zonas\/\d+/),
      },
      {
        label: "Categorías",
        href: "/categorias",
        icon: GiFruitBowl,
        active:
          pathname === "/categorias" || !!pathname.match(/\/categorias\/\d+/),
      },
      {
        label: "Proveedores",
        href: "/proveedores",
        icon: FaBasketShopping,
        active:
          pathname === "/proveedores" || !!pathname.match(/\/proveedores\/\d+/),
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
