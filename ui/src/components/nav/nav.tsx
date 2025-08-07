"use client";

import { FC } from "react";
import { BackButton } from "./back-button";
import { navBar } from "./selectors";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type NavBarProps = {
  categoryName: string;
};

export const NavBar: FC<NavBarProps> = ({ categoryName }) => {
  const isMobile = useIsMobile();
  return (
    <nav
      className={cn("flex justify-between font-main text-4xl p-5 bg-[#33b3ee] text-white w-[100%] text-center rounded-b-2xl relative", {
        "text-3xl p-3": isMobile
      })}
      date-testid={navBar}
    >
      <BackButton />
      <p className="absolute left-0 right-0">
        {categoryName[0].toUpperCase() + categoryName.slice(1)}
      </p>
      <div></div>
    </nav>
  );
};
