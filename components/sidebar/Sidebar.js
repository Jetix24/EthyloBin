import React from "react";
import { authOptions } from "@/libs/next-auth";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import { getServerSession } from "next-auth";

async function Sidebar({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full relative">
      <DesktopSidebar image={session?.user?.image} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
