// app/components/Avatar.js
'use client';

import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  image?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
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
      >
        <Image
          alt="Avatar"
          src={image || '/img/placeholder.jpg'}
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
