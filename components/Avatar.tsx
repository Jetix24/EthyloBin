// app/components/Avatar.js
'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Modal from "@/components/Common/modals/Modal";
import { signOut } from 'next-auth/react';
import { RiLogoutBoxFill } from 'react-icons/ri';

interface AvatarProps {
  image?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
        "
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          alt="Avatar"
          src={image || '/img/placeholder.webp'}
          fill
        />
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Salir de la sesión"
        >
          <div className="flex justify-end">
          <button onClick={handleLogout}  className="mt-4 w-full sm:w-auto text-cute_white btn bg-cute_purple hover:bg-blue_purple rounded-md">
          <RiLogoutBoxFill className="h-7 w-7 shrink-0" />
            Cerrar sesión
          </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
