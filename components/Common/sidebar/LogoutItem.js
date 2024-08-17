'use client';
import React from 'react';
import clsx from "clsx";
import { RiLogoutBoxFill } from 'react-icons/ri';

const LogoutItem = ({ onClick, active }) => {
  return (
    <li onClick={onClick}>
      <button
        className={clsx(`
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-emerald-500
          hover:text-emerald-500
          hover:bg-gray-100
        `,
          active && 'bg-emerald-500 text-gray-100'
        )}
      >
        <RiLogoutBoxFill className="h-7 w-7 shrink-0" />
        <span className="sr-only">Logout</span>
      </button>
    </li>
  );
}

export default LogoutItem;
