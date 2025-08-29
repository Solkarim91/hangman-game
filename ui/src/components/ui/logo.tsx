import Image from "next/image";
import { logo } from "./selectors";
import { FC } from "react";

type LogoProps = {
  isMobile: boolean;
};

export const Logo: FC<LogoProps> = ({ isMobile }) => (
  <div className="flex flex-col items-center">
    <Image
      src="/hangman-logo.png"
      alt="Hangman logo"
      width={isMobile ? 150 : 200}
      height={isMobile ? 32.25 : 43}
      priority
      data-testid={logo}
    />
    <h1 className="font-main text-3xl">HANGMAN</h1>
  </div>
);
