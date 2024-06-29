"use client";

import EmptyState from "@/components/EmptyState";

const Home = () => {
  return (
    <div className="lg:pl-80 h-full">
      <EmptyState tipo={"un proveedor para ver que hace falta de comprar"} />
    </div>
  );
};

export default Home;
