import React, { useEffect, useState } from 'react';
import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";

async function Sidebar({ children }: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);


  return (
    <div className="h-full">
      <DesktopSidebar currentUserImage={user.image} />
      {/*<MobileFooter />*/}
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
}


export default Sidebar;