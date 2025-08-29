import { motion } from "framer-motion";
import { GameStatusType } from "../types";
import { FC } from "react";
import { Logo } from "@/components/ui/logo";
import { GameOverLogo } from "@/components/ui/game-over-logo";

type GameIconProps = {
  gameStatus: GameStatusType;
  isMobile: boolean;
};

export const GameIcon: FC<GameIconProps> = ({ gameStatus, isMobile }) => {
  return (
    <div>
      <motion.div
        key={gameStatus}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl font-bold text-center font-main"
      >
        {gameStatus !== "lost" ? 
          <Logo isMobile={isMobile}/> :
          <GameOverLogo isMobile={isMobile}/>}
      </motion.div>
    </div>
  );
};
