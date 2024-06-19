import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { FaBasketShopping } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { MdOutlineKitchen } from "react-icons/md";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      label: 'Zonas', 
      href: '/zonas',
      icon: MdOutlineKitchen, 
      active: pathname === '/zonas'
    },
    { 
      label: 'Materia Prima', 
      href: '/materiaprima', 
      icon: GiFruitBowl,
      active: pathname === '/materiaprima'
    },
    { 
      label: 'Proveedores', 
      href: '/proveedores', 
      icon: FaBasketShopping, 
      active: pathname === '/proveedores'
    }
    
  ], [pathname]);

  return routes;
};

export default useRoutes;