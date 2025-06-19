"use client";

import { useState } from "react";
import { Keyboard } from "./keyboard";

export const Game = () => {
  const [usedLetters, setUsedLetters] = useState<
    Record<string, "correct" | "incorrect" | "default">
  >({});

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
      <Keyboard onKeyClick={handleKeyClick} usedLetters={usedLetters} />
    </div>
  );
};
