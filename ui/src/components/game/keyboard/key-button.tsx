import { cn } from "@/lib/utils";
import { FC } from "react";
import { KeyButtonType } from "../types";
import { LETTER_STATE } from "../constants";

type KeyButtonProps = {
  letter: string;
  onClick: (letter: string) => void;
  disabled?: boolean;
  state?: KeyButtonType;
};

export const KeyButton: FC<KeyButtonProps> = ({
  letter,
  onClick,
  disabled = false,
  state = LETTER_STATE.default,
}) => {
  return (
    <button
      onClick={() => onClick(letter)}
      disabled={disabled}
      className={cn(
        "rounded-md w-8.5 h-10 sm:w-12 sm:h-12",
        "flex items-center justify-center font-main shadow text-2xl",
        "transition-colors duration-200 ease-in-out",
        {
          "bg-white text-black hover:bg-gray-400":
            state === LETTER_STATE.default && !disabled,
          "bg-green-500 text-white border border-black":
            state === LETTER_STATE.correct,
          "bg-red-500 text-white border border-black":
            state === LETTER_STATE.incorrect,
          "opacity-75 cursor-not-allowed": disabled,
        }
      )}
      aria-label={`Letter ${letter}`}
    >
      {letter}
    </button>
  );
};
