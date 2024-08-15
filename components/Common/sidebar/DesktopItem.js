"use client";
import React from "react";
import clsx from "clsx";
import Link from "next/link";

const DesktopItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-white_purple
          hover:text-cute_blue
          hover:bg-white_purple
        `,
          active && "bg-cute_blue text-white_purple"
        )}
      >
        <Icon className="h-7 w-7 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
