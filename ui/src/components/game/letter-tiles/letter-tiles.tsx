import { FC, useMemo } from "react";
import { GameStatusType, LetterStateType } from "../types";
import {
  LETTER_TILE_CONTAINER_VARIANTS,
  LETTER_TILE_STATE,
  LETTER_TILE_VARIANTS,
} from "../constants";
import { AnimatePresence, motion } from "framer-motion";
import { LetterTile } from "./letter-tile";
import { letterTilesContainer } from "./selectors";

type LetterTilesProps = {
  gameWords: string[];
  gameStatus: GameStatusType;
  usedLetters: Record<string, LetterStateType>;
  isMobile: boolean;
};

export const LetterTiles: FC<LetterTilesProps> = ({
  gameWords,
  gameStatus,
  usedLetters,
  isMobile
}) => {
  const containsLongWords = useMemo(
    () => Boolean(gameWords?.find((word) => word.length >= 8)),
    [gameWords]
  );

  const containsVeryLongWords = useMemo(
    () => Boolean(gameWords?.find((word) => word.length >= 11)),
    [gameWords]
  );

  const totalCharactersExceedsThreshold = useMemo(
    () => Boolean((gameWords?.reduce((sum, word) => sum + word.length, 0) ?? 0) >= 16),
    [gameWords]
  );

  const useCondensedSpacing = useMemo(() => {
    return (
      isMobile &&
      (containsLongWords || totalCharactersExceedsThreshold)
    );
  }, [isMobile, containsLongWords, totalCharactersExceedsThreshold]);

  return (
    <>
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
              className={`flex ${useCondensedSpacing ? "gap-1" : "gap-2"}`}
              data-testid={letterTilesContainer}
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
                    containsVeryLongWords={containsVeryLongWords}
                    totalCharactersExceedsThreshold={totalCharactersExceedsThreshold}
                    isMobile={isMobile}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
