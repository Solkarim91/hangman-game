"use client";

import React, { FC } from "react";
import { KeyButton } from "./key-button";
import { LETTER_STATE, QWERTY_LAYOUT } from "../constants";
import { LetterStateType } from "../types";
import { cn } from "@/lib/utils";

type KeyboardProps = {
  onKeyClick: (letter: string) => void;
  usedLetters?: Record<string, LetterStateType>;
  isGameStarted: boolean;
  isMobile: boolean;
};

export const Keyboard: FC<KeyboardProps> = ({
  onKeyClick,
  usedLetters = {},
  isGameStarted,
  isMobile
}) => {
  return (
    <div className="absolute left-0 right-0 bottom-7.5 lg:bottom-4 2xl:bottom-20">
      {!isGameStarted && (
        <p className={cn("flex justify-center font-main text-2xl", {
          "text-xl": isMobile
        })}>
          {"Choose a letter below to get started!"}
        </p>
      )}
      <div className="flex flex-col gap-2 items-center mt-4">
        {QWERTY_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5 sm:gap-2 xl:gap-3">
            {row.map((letter) => (
              <KeyButton
                key={letter}
                letter={letter}
                onClick={onKeyClick}
                disabled={
                  usedLetters[letter] &&
                  usedLetters[letter] !== LETTER_STATE.default
                }
                state={usedLetters[letter] || LETTER_STATE.default}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
