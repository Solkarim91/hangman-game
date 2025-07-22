import { FC, useMemo } from "react";
import { GameStatusType, LetterStateType } from "../types";
import {
  LETTER_TILE_CONTAINER_VARIANTS,
  LETTER_TILE_STATE,
  LETTER_TILE_VARIANTS,
} from "../constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LetterTile } from "./letter-tile";
import { useIsMobile } from "@/hooks/use-mobile";

type LetterTilesProps = {
  gameWords: string[];
  gameStatus: GameStatusType;
  usedLetters: Record<string, LetterStateType>;
};

export const LetterTiles: FC<LetterTilesProps> = ({
  gameWords,
  gameStatus,
  usedLetters,
}) => {
  const containsLongWords = useMemo(
    () => Boolean(gameWords?.find((word) => word.length >= 8)),
    [gameWords]
  );

  const isMobile = useIsMobile();

  const useCondensedSpacing = useMemo(
    () => containsLongWords && isMobile,
    [containsLongWords, isMobile]
  );

  return (
    <div className="flex flex-wrap gap-x-12 gap-y-4 max-w-[100vw] justify-center">
      <AnimatePresence>
        <motion.div
          key={gameStatus}
          variants={LETTER_TILE_CONTAINER_VARIANTS}
          custom={gameStatus}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-x-12 gap-y-4 max-w-[100vw] justify-center"
        >
          {gameWords.map((word, wordIndex) => (
            <div
              key={`word-${wordIndex}`}
              className={cn("flex", useCondensedSpacing ? "gap-1" : "gap-2")}
            >
              {word.split("").map((char, charIndex) => (
                <motion.div
                  variants={LETTER_TILE_VARIANTS}
                  key={`tile-${wordIndex}-${charIndex}`}
                >
                  <LetterTile
                    char={char}
                    state={
                      usedLetters[char]
                        ? LETTER_TILE_STATE.correct
                        : LETTER_TILE_STATE.default
                    }
                    gameStatus={gameStatus}
                    containsLongWords={containsLongWords}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
