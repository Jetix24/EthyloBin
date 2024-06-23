"use client";

import { useRouter } from "next/navigation";

const CategoriaBox = ({ categoria }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/categorias/${categoria._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer my-2 p-2 border rounded hover:bg-gray-100"
    >
      <div className="font-bold">{categoria.name}</div>
    </div>
  );
};

export default CategoriaBox;
