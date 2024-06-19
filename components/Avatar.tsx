'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AvatarProps {
  userId?: string;
}

const Avatar: React.FC<AvatarProps> = ({ userId }) => {
  const [user, setUser] = useState<{ image?: string } | null>(null);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

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
          src={user?.image || '/img/placeholder.jpg'}
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
