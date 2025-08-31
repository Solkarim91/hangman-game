"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const handleBackButtonClick = () => router.push("/");

  return (
    <button className="z-1 cursor-pointer hover:opacity-85 mx-2" onClick={handleBackButtonClick}>
      🔙
    </button>
  );
};
