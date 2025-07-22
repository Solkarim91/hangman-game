"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const handleBackButtonClick = () => router.back();

  return (
    <button className="z-1" onClick={handleBackButtonClick}>
      🔙
    </button>
  );
};
