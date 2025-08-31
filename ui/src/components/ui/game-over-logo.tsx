import Image from "next/image";
import { gameOverLogo } from "./selectors";
import { FC } from "react";

type GameOverLogoProps = {
  isMobile: boolean;
};

export const GameOverLogo: FC<GameOverLogoProps> = ({ isMobile }) => (
  <div className="flex justify-center">
    <Image
      src="/game-over.png"
      alt="Game over logo"
      width={isMobile ? 120 : 150}
      height={isMobile ? 25.60 : 32}
      priority
      data-testid={gameOverLogo}
    />
  </div>
);
