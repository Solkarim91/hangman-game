"use client";

import { Heart } from "lucide-react";
import { FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LIFE_ICON_CONTAINER_VARIANTS, LIFE_ICON_VARIANTS } from "../constants";
import { GameStatusType } from "../types";
import { heartIcon, lifeIcon } from "./selectors";

type LivesIndicatorProps = {
  maxLives: number;
  numOfIncorrectGuesses: number;
  gameStatus: GameStatusType;
  isMobile: boolean;
};

export const LivesIndicator: FC<LivesIndicatorProps> = ({
  maxLives,
  numOfIncorrectGuesses,
  gameStatus,
  isMobile
}) => {
  return (
    <motion.div
      key={gameStatus}
      variants={LIFE_ICON_CONTAINER_VARIANTS}
      initial="initial"
      animate="animate"
      className={cn("flex gap-2 justify-center my-8", {
        "my-4": isMobile
      })}
    >
      {Array.from({ length: maxLives }).map((_, i) => {
        const isLost = i >= maxLives - numOfIncorrectGuesses;
        const justLost =
          i === maxLives - numOfIncorrectGuesses && numOfIncorrectGuesses > 0;

        return (
          <motion.div
            key={`life-${i}`}
            variants={LIFE_ICON_VARIANTS}
            data-testid={lifeIcon}
            animate={
              justLost
                ? {
                    scale: [1.2, 0.8, 1],
                    opacity: [1, 0.8, 1],
                    x: [0, -2, 2, -1, 1, -0.5, 0.5, 0],
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }
                : undefined
            }
            className="*:w-10 *:h-10"
          >
            <Heart
              fill={!isLost ? "red" : "none"}
              stroke="black"
              strokeWidth={1}
              className={cn("transition-all")}
              data-testid={heartIcon}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
