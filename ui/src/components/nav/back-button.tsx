"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const handleBackButtonClick = () => router.back();

  return <button onClick={handleBackButtonClick}>🔙</button>;
};
