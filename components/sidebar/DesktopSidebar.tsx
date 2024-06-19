'use client';

import { useState } from "react";

import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";
import useRoutes from "@/app/hooks/useRoutes";
import Image from "next/image";

interface DesktopSidebarProps {
  currentUserImage: string;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUserImage
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      {/*<SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      /> */}
      <div
          className="
            hidden
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:z-40
            lg:w-20
            lg:overflow-y-auto
            lg:bg-slate-900
            lg:border-r-[1px]
            border-slate-800
            lg:pb-4
            lg:flex
            lg:flex-col
          "
        >
          <div
            className="
            py-4
            flex
            items-center
            justify-center   
            w-full
            h-50        
            "
          >
            <Image
              src="/img/icon.png"
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
          <hr className="w-full border-slate-600" />
          <nav
            className="
              mt-4
              flex
              flex-col
              justify-between
            "
          >
            <ul
              role="list"
              className="
                flex
                flex-col
                items-center
                space-y-1
              "
            >
              {routes.map((item) => (
                <DesktopItem
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={item.active}
                />
              ))}
            </ul>
          </nav>
          <nav
            className="
              mt-4
              flex
              flex-col
              justify-between
              items-center
              h-96
            "
          >
            <div
              onClick={() => setIsOpen(true)}
              className="
                cursor-pointer
                hover:opacity-75
                transition
                mt-auto
              "
            >
              <Avatar image={currentUserImage} />
            </div>
          </nav>
        </div>
      </>
   );
}
 
export default DesktopSidebar;