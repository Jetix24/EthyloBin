"use client";

import { useRouter } from "next/navigation";

const ZoneBox = ({ zona }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/zonas/${zona._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer my-2 p-2 border rounded hover:bg-gray-100"
    >
      <div className="font-bold">{zona.name}</div>
    </div>
  );
};

export default ZoneBox;
