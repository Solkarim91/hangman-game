"use client";

import React, { FC } from "react";
import { KeyButton } from "./key-button";
import { LETTER_STATE, QWERTY_LAYOUT } from "../constants";
import { LetterStateType } from "../types";

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
    <div className="absolute left-0 right-0 bottom-7.5 md:bottom-20">
      {!isGameStarted && (
        <div className="flex justify-center">
          <p className="font-main text-2xl">
            {"Choose a letter below to get started!"}
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 items-center mt-8">
        {QWERTY_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
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
                isMobile={isMobile}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
