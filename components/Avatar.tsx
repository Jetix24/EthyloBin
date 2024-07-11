// app/components/Avatar.js
'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '@/components/Modal';
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
          src={image || '/img/placeholder.jpg'}
          fill
        />
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Salir de la sesión"
        >
          <button onClick={handleLogout} className="mt-4 btn btn-primary">
          <RiLogoutBoxFill className="h-7 w-7 shrink-0" />
            Cerrar sesión
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
