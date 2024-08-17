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
        text-white_purple
        hover:text-cute_blue
        hover:bg-white_purple
      `,
        active && "bg-cute_blue text-white_purple"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
