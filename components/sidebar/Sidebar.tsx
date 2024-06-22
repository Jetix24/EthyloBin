import React from 'react';
import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";

async function Sidebar({ children }: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUserImage={user?.image} />
      {/*<MobileFooter />*/}
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
}


export default Sidebar;