"use client";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import useZone from "@/app/hooks/useZone";
import { RiLogoutBoxFill } from "react-icons/ri";
import { signOut } from "next-auth/react";
import clsx from "clsx";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useZone();

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

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
        bg-dark_purple
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
      <div className="w-full">
        <button
          onClick={logout}
          className={clsx(
            `
            group
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            p-4
          text-white_purple
          hover:text-cute_blue
          hover:bg-white_purple
          `
          )}
        >
          <RiLogoutBoxFill className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MobileFooter;
