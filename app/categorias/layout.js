import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import CategoriaList from "./components/CategoriaList";
import getSession from "../actions/getSession";
import { redirect } from "next/navigation";
import config from "@/config";
import getCurrentUser from '../actions/getCurrentUser';

export default async function CategoriaLayout({ children }) {
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
      <CategoriaList />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
