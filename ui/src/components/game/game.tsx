"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard } from "./keyboard";
import { categoryWords } from "@/lib/category-words";
import { getRandomInt, formatGamePhrase, cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { LetterTile } from "./letter-tile";
import { useIsMobile } from "@/hooks/use-mobile";
import { checkUserWon } from "./utils";
import { GameStatusType, UsedLetterType } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "../ui/logo";

type GameProps = {
  categoryName: string;
};

export const Game: FC<GameProps> = ({ categoryName }) => {
  const [gameStatus, setGameStatus] = useState<GameStatusType>("playing");
  const [usedLetters, setUsedLetters] = useState<
    Record<string, UsedLetterType>
  >({});
  const [gameWords, setGameWords] = useState<string[]>();
  const [userSelectionFeedback, setUserSelectionFeedback] =
    useState<string>("");
  const router = useRouter();

  const containsLongWords = useMemo(
    () => Boolean(gameWords?.find((word) => word.length >= 8)),
    [gameWords]
  );

  const isMobile = useIsMobile();

  const useCondensedSpacing = useMemo(
    () => containsLongWords && isMobile,
    [containsLongWords, isMobile]
  );

  const isGameStarted = useMemo(
    () => Object.keys(usedLetters).length !== 0,
    [usedLetters]
  );

  const getNewGameWords = useCallback(() => {
    const words = categoryWords[categoryName];
    const gameWord = words[getRandomInt(words.length)].toUpperCase();
    setGameWords(formatGamePhrase(gameWord));
  }, [categoryName]);

  console.log("gameWords: ", gameWords); //TODO: Remove as being currently used for testing purposes

  useEffect(() => {
    getNewGameWords();
  }, [categoryName]);

  useEffect(() => {
    if (!gameWords) return;

    const hasWon = checkUserWon(gameWords, usedLetters);

    if (hasWon) {
      setGameStatus("won");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [usedLetters, gameWords]);

  const handleKeyClick = (letter: string) => {
    const isCorrect = gameWords?.some((word) => word.includes(letter));
    setUsedLetters((prev) => ({
      ...prev,
      [letter]: isCorrect ? "correct" : "incorrect",
    }));
    setUserSelectionFeedback(isCorrect ? "Nice! ✅" : "Try again ❌");
  };

  const handlePlayAgainButtonClick = useCallback(() => {
    setUsedLetters({});
    getNewGameWords();
    setUserSelectionFeedback("");
    setGameStatus("playing");
  }, [getNewGameWords]);

  const handleNewCategoryButtonClick = () => router.back();

  return (
    <>
      <div className="p-10 w-[100%] h-[60vh] flex flex-col justify-between mt-10 sm:mt-0 relative">
        <div className="mb-10">
          <Logo />
        </div>
        {gameStatus === "won" && (
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
                <Button
                  variant={"outline"}
                  onClick={handlePlayAgainButtonClick}
                >
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
          <div
            className={`text-center flex flex-col h-full ${isGameStarted ? "" : "justify-between"}`}
          >
            <div className="flex flex-wrap gap-x-12 gap-y-4 max-w-[100vw] justify-center">
              <AnimatePresence>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: gameStatus === "won" ? 50 : 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
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
                        <LetterTile
                          key={`word-${wordIndex}-char-${charIndex}`}
                          char={char}
                          state={usedLetters[char] ? "correct" : "default"}
                          containsLongWords={containsLongWords}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            {gameStatus === "playing" &&
              (!isGameStarted ? (
                <div>
                  <p className="font-main text-2xl">
                    {"Choose a letter below to get started!"}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-4xl font-bold font-main justify-items-center"
                >
                  <div className="mt-10">
                    <p className="font-main text-4xl">
                      {userSelectionFeedback}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <div>
        {gameStatus === "playing" && (
          <Keyboard onKeyClick={handleKeyClick} usedLetters={usedLetters} />
        )}
      </div>
    </>
  );
};
