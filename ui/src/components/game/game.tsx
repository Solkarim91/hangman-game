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

type GameProps = {
  categoryName: string;
};

export const Game: FC<GameProps> = ({ categoryName }) => {
  const [gameStatus, setGameStatus] = useState<GameStatusType>("playing");
  const [usedLetters, setUsedLetters] = useState<
    Record<string, UsedLetterType>
  >({});

  const [gameWords, setGameWords] = useState<string[] | undefined>();

  const containsLongWords = useMemo(
    () => Boolean(gameWords?.find((word) => word.length >= 8)),
    [gameWords]
  );

  const isMobile = useIsMobile();

  const getNewGameWords = useCallback(() => {
    const words = categoryWords[categoryName];
    const gameWord = words[getRandomInt(words.length)].toUpperCase();
    setGameWords(formatGamePhrase(gameWord));
  }, [categoryName]);

  useEffect(() => {
    getNewGameWords();
  }, [categoryName]);

  console.log("gameWords: ", gameWords);

  const useCondensedSpacing = useMemo(
    () => containsLongWords && isMobile,
    [containsLongWords, isMobile]
  );

  const handleKeyClick = (letter: string) => {
    const isCorrect = gameWords?.some((word) => word.includes(letter));
    setUsedLetters((prev) => ({
      ...prev,
      [letter]: isCorrect ? "correct" : "incorrect",
    }));
  };

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

  const handlePlayAgainButtonClick = useCallback(() => {
    getNewGameWords();
    setUsedLetters({});
    setGameStatus("playing");
  }, [getNewGameWords]);

  const router = useRouter();
  const handleNewCategoryButtonClick = () => router.back();

  return (
    <div className="p-20 w-[100%] h-[90vh] flex flex-col justify-between">
      <h1 className="text-2xl font-bold">Hangman Game</h1>
      {gameStatus === "won" && (
        <div className="flex flex-col gap-15">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl font-bold text-center font-main"
          >
            🎉 YOU WON!!! 🎉
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
            className="text-4xl font-bold font-main justify-items-center"
          >
            <div className="flex flex-col items-center gap-3 *:text-2xl *:px-20 *:w-[30%]">
              <Button variant={"outline"} onClick={handlePlayAgainButtonClick}>
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
      ) : (
        <Loading />
      )}
      <div>
        {gameStatus === "playing" && (
          <Keyboard onKeyClick={handleKeyClick} usedLetters={usedLetters} />
        )}
      </div>
    </div>
  );
};
