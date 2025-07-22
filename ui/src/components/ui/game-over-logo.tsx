import Image from "next/image";
import { gameOverLogo } from "./selectors";

export const GameOverLogo = () => (
  <div className="flex justify-center">
    <Image
      src="/game-over.png"
      alt="Game over logo"
      width={150}
      height={32}
      priority
      data-testid={gameOverLogo}
    />
  </div>
);
