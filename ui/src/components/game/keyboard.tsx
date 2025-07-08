"use client";

import React, { FC } from "react";
import { KeyButton } from "./key-button";
import { QWERTY_LAYOUT } from "./constants";

type KeyboardProps = {
  onKeyClick: (letter: string) => void;
  usedLetters?: Record<string, "correct" | "incorrect" | "default">;
};

export const Keyboard: FC<KeyboardProps> = ({
  onKeyClick,
  usedLetters = {},
}) => {
  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      {QWERTY_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((letter) => (
            <KeyButton
              key={letter}
              letter={letter}
              onClick={onKeyClick}
              disabled={
                usedLetters[letter] && usedLetters[letter] !== "default"
              }
              state={usedLetters[letter] || "default"}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
