import { cn } from "@/lib/utils";
import { FC, useMemo } from "react";
import { GameStatusType, LetterTileStateType } from "../types";
import { getTileString } from "../utils";
import { LETTER_TILE_STATE } from "../constants";

type LetterTileProps = {
  char: string;
  containsLongWords: boolean;
  containsVeryLongWords: boolean;
  totalCharactersExceedsThreshold: boolean;
  isMobile: boolean;
  state: LetterTileStateType;
  gameStatus: GameStatusType;
};

export const LetterTile: FC<LetterTileProps> = ({
  char,
  containsLongWords,
  containsVeryLongWords,
  totalCharactersExceedsThreshold,
  isMobile,
  state,
  gameStatus,
}) => {
  const isSpace = char === " ";

  const smallStyling = useMemo(() => containsLongWords || totalCharactersExceedsThreshold || isMobile, [containsLongWords, totalCharactersExceedsThreshold, isMobile]);

  return (
    <div
      className={cn(
        "w-10 aspect-square rounded-md border border-black",
        "flex items-center justify-center font-main uppercase shadow text-2xl",
        "transition-colors duration-200 ease-in-out",
        {
          "w-8": smallStyling,
          "w-7": containsVeryLongWords && isMobile,
          "bg-[#6097b9] text-white hover:bg-gray-400":
            state === LETTER_TILE_STATE.default && !isSpace,
          "bg-green-500 text-white": state === LETTER_TILE_STATE.correct,
          invisible: isSpace,
        }
      )}
      aria-label={
        isSpace
          ? "Space"
          : `Character ${char.replace(char, state === LETTER_TILE_STATE.correct ? `'${char}'` : "'_'")}`
      }
    >
      {getTileString(char, isSpace, state, gameStatus)}
    </div>
  );
};
