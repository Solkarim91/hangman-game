"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

interface NavBarProps {
  categoryName: string;
}

export const NavBar: FC<NavBarProps> = ({ categoryName }) => {
  const router = useRouter();
  const handleBackButtonClick = () => router.back();

  return (
    <nav className="flex justify-between font-main text-4xl p-5 bg-[#33b3ee] text-white w-[100%] text-center rounded-b-2xl">
      <button onClick={handleBackButtonClick}>🔙</button>
      <p>{categoryName[0].toUpperCase() + categoryName.slice(1)}</p>
      <div></div>
    </nav>
  );
};
