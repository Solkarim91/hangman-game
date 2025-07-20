"use client";

import React, { FC } from "react";
import { KeyButton } from "./key-button";
import { LETTER_STATE, QWERTY_LAYOUT } from "./constants";
import { LetterStateType } from "./types";

type KeyboardProps = {
  onKeyClick: (letter: string) => void;
  usedLetters?: Record<string, LetterStateType>;
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
                usedLetters[letter] &&
                usedLetters[letter] !== LETTER_STATE.default
              }
              state={usedLetters[letter] || LETTER_STATE.default}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
