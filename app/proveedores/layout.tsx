import React from 'react';
import Sidebar from "@/components/sidebar/Sidebar";
import ProveedorList from "./components/ProveedorList";
import getSession from "../actions/getSession";
import { redirect } from "next/navigation";
import config from "@/config";
import getCurrentUser from '../actions/getCurrentUser';

export default async function ProveedoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = await getCurrentUser();

  if (!session) {
    redirect(config.auth.loginUrl);
  }
  if(!user?.hasAccess) {
    redirect(config.auth.landUrl);
  }

  return (
    <Sidebar>
      <div className="h-full">
        <ProveedorList />
        {children}
      </div>
    </Sidebar>
  );
}
