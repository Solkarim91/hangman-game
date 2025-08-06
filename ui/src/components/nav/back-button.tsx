"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const handleBackButtonClick = () => router.back();

  return (
    <button className="z-1 cursor-pointer hover:opacity-85" onClick={handleBackButtonClick}>
      🔙
    </button>
  );
};
