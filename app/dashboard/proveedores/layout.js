import React from 'react';
import ProveedorList from "./components/ProveedorList";

export default async function ProveedoresLayout({ children }) {

  return (
      <div className="h-full">
          <ProveedorList />
          {children}
      </div>
  );
}
