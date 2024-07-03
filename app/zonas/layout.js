import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ZoneList from "./components/ZoneList";
import getSession from "../actions/getSession";
import { redirect } from "next/navigation";
import config from "@/config";
import getCurrentUser from "../actions/getCurrentUser";

export default async function ZonasLayout({ children }) {
  const session = await getSession();
  const user = await getCurrentUser();

  if (!session) {
    redirect(config.auth.loginUrl);
  }
  if (!user?.hasAccess) {
    redirect(config.auth.landUrlPri);
  }

  return (
    <Sidebar>
      <div className="h-full">
        <ZoneList />
        {children}
      </div>
    </Sidebar>
  );
}
