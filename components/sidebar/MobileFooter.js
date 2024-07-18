"use client";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import useZone from "@/app/hooks/useZone";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useZone();

  console.log("isOpen en Mobile Footer", isOpen);

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
      "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
