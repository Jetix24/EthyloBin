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
        active: pathname === "/materiaprima",
      },
      {
        label: "Zonas",
        href: "/zonas",
        icon: MdOutlineKitchen,
        active: pathname === "/zonas",
      },
      {
        label: "Categorías",
        href: "/categorias",
        icon: GiFruitBowl,
        active: pathname === "/categorias",
      },
      {
        label: "Proveedores",
        href: "/proveedores",
        icon: FaBasketShopping,
        active: pathname === "/proveedores",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
