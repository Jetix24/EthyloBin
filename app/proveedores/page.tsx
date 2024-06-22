"use client";

import EmptyState from "@/components/EmptyState";
import clsx from "clsx";

const Home = () => {

  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:block",
        true ? 'block' : 'hidden'
      )}
    >
      <EmptyState />
    </div>
  )
};

export default Home;