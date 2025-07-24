import { FC } from "react";
import { BackButton } from "./back-button";
import { navBar } from "./selectors";

type NavBarProps = {
  categoryName: string;
};

export const NavBar: FC<NavBarProps> = ({ categoryName }) => {
  return (
    <nav
      className="flex justify-between font-main text-4xl p-5 bg-[#33b3ee] text-white w-[100%] text-center rounded-b-2xl relative"
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
