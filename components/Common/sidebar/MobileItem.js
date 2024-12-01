"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";

const MobileItem = ({ href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
      text-green_100
      hover:text-green_200
      hover:bg-gray_100
      `,
        active && "bg-gray_100 text-green_100"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
