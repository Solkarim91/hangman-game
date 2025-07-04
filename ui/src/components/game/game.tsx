"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Keyboard } from "./keyboard";
import { categoryWords } from "@/lib/category-words";
import { getRandomInt, formatGamePhrase, cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { LetterTile } from "./letter-tile";
import { useIsMobile } from "@/hooks/use-mobile";

type GameProps = {
  categoryName: string;
};

export const Game: FC<GameProps> = ({ categoryName }) => {
  const [usedLetters, setUsedLetters] = useState<
    Record<string, "correct" | "incorrect" | "default">
  >({});

  const [gameWords, setGameWords] = useState<string[] | undefined>();

  useEffect(() => {
    const words = categoryWords[categoryName];
    const gameWord = words[getRandomInt(words.length)].toUpperCase();
    setGameWords(formatGamePhrase(gameWord));
  }, [categoryName]);

  const containsLongWords = useMemo(
    () => Boolean(gameWords?.find((word) => word.length >= 8)),
    [gameWords]
  );

  const isMobile = useIsMobile();
  const useCondensedSpacing = useMemo(
    () => containsLongWords && isMobile,
    [containsLongWords, isMobile]
  );

  const handleKeyClick = (letter: string) => {
    // Mock check
    const isCorrect = Math.random() > 0.5;
    console.log("isCorrect: ", isCorrect);
    setUsedLetters((prev) => ({
      ...prev,
      [letter]: isCorrect ? "correct" : "incorrect",
    }));
  };

  return (
    <div className="p-20 w-[100%] h-[90vh] flex flex-col justify-between">
      <h1 className="text-2xl font-bold">Hangman Game</h1>
      {gameWords ? (
        <div className="flex flex-wrap gap-x-12 gap-y-4 max-w-[100vw] justify-center">
          {gameWords.map((word, wordIndex) => (
            <div
              key={wordIndex}
              className={cn("flex", useCondensedSpacing ? "gap-1" : "gap-2")}
            >
              {word.split("").map((char, charIndex) => (
                <LetterTile
                  key={`${wordIndex}-${charIndex}`}
                  index={charIndex}
                  char={char}
                  state={"default"}
                  containsLongWords={containsLongWords}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}

      <Keyboard onKeyClick={handleKeyClick} usedLetters={usedLetters} />
    </div>
  );
};
