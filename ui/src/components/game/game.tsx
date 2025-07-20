"use client";

import { FC, useMemo } from "react";
import { Keyboard } from "./keyboard";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { LetterTile } from "./letter-tile";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "../ui/logo";
import { LivesIndicator } from "./lives-indicator";
import {
  GAME_STATUS,
  LETTER_TILE_CONTAINER_VARIANTS,
  LETTER_TILE_STATE,
  LETTER_TILE_VARIANTS,
  USER_FEEDBACK_MESSAGES,
} from "./constants";
import { GameOverLogo } from "../ui/game-over-logo";
import { useGameLogic } from "@/hooks/use-game-logic";

type GameProps = {
  categoryName: string;
};

export const Game: FC<GameProps> = ({ categoryName }) => {
  const {
    gameWords,
    gameStatus,
    usedLetters,
    numOfIncorrectGuesses,
    userSelectionFeedback,
    maxLives,
    isGameStarted,
    handleKeyClick,
    resetGame,
  } = useGameLogic({ categoryName }); //TODO: include 'difficulty' (probably passed down as a prop in future)
  const router = useRouter();
  const handleNewCategoryButtonClick = () => router.back();

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
    <>
      <div className="p-10 w-[100%] h-[70vh] flex flex-col justify-between sm:mt-0 relative">
        <div className="mb-10">
          <motion.div
            key={gameStatus}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center font-main"
          >
            {gameStatus !== "lost" ? <Logo /> : <GameOverLogo />}
          </motion.div>
        </div>
        {gameStatus === GAME_STATUS.won && (
          <div className="flex flex-col gap-10 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl font-bold text-center font-main"
            >
              {"🎉 YOU WON!!! 🎉"}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-bold font-main justify-items-center"
            >
              <div className="flex flex-col items-center gap-3 *:text-2xl *:px-20 *:w-[30%]">
                <Button variant={"outline"} onClick={resetGame}>
                  {"PLAY AGAIN"}
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleNewCategoryButtonClick}
                >
                  {"NEW CATEGORY"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
        {gameStatus === GAME_STATUS.lost && (
          <div className="flex flex-col gap-10 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl font-bold text-center font-main"
            >
              {"💀 YOU LOST 💀"}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-bold font-main justify-items-center"
            >
              <div className="flex flex-col items-center gap-3 *:text-2xl *:px-20 *:w-[30%]">
                <Button variant={"outline"} onClick={resetGame}>
                  {"PLAY AGAIN"}
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleNewCategoryButtonClick}
                >
                  {"NEW CATEGORY"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
        {gameWords ? (
          <>
            {gameStatus === GAME_STATUS.playing && (
              <LivesIndicator
                maxLives={maxLives}
                numOfIncorrectGuesses={numOfIncorrectGuesses}
                gameStatus={gameStatus}
              />
            )}
            <div
              className={`text-center flex flex-col h-full ${gameStatus === GAME_STATUS.playing ? "mt-10" : ""} ${isGameStarted ? "" : "justify-between"}`}
            >
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
                        className={cn(
                          "flex",
                          useCondensedSpacing ? "gap-1" : "gap-2"
                        )}
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
              {gameStatus === GAME_STATUS.playing &&
                (!isGameStarted ? (
                  <div>
                    <p className="font-main text-2xl">
                      {"Choose a letter below to get started!"}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {userSelectionFeedback && (
                      <motion.div
                        key={userSelectionFeedback}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x:
                            userSelectionFeedback ===
                            USER_FEEDBACK_MESSAGES.lastChance
                              ? [0, -4, 4, -3, 3, -2, 2, 0]
                              : 0,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-4xl font-bold font-main justify-items-center mt-10"
                      >
                        <p className="font-main text-4xl">
                          {userSelectionFeedback}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <div>
        {gameStatus === GAME_STATUS.playing && (
          <Keyboard onKeyClick={handleKeyClick} usedLetters={usedLetters} />
        )}
      </div>
    </>
  );
};
