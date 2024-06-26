import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import CategoriaList from "./components/CategoriaList";

export default function CategoriaLayout({ children }) {
  return (
    <Sidebar>
      <CategoriaList />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
