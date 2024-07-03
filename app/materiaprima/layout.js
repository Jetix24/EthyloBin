import React from 'react';
import Sidebar from "@/components/sidebar/Sidebar";

export default async function materiaprimaLayout({children}) {

  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
