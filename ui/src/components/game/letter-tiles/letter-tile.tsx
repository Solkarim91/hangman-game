import { cn } from "@/lib/utils";
import { FC, useMemo } from "react";
import { GameStatusType, LetterTileStateType } from "../types";
import { getTileString } from "../utils";
import { LETTER_TILE_STATE } from "../constants";

type LetterTileProps = {
  char: string;
  containsLongWords: boolean;
  totalCharactersExceedsThreshold: boolean;
  state: LetterTileStateType;
  gameStatus: GameStatusType;
};

export const LetterTile: FC<LetterTileProps> = ({
  char,
  containsLongWords,
  totalCharactersExceedsThreshold,
  state,
  gameStatus,
}) => {
  const isSpace = char === " ";

  const smallStyling = useMemo(() => containsLongWords || totalCharactersExceedsThreshold, [containsLongWords, totalCharactersExceedsThreshold]);

  return (
    <div
      className={cn(
        "w-10 sm:w-12 aspect-square rounded-md border border-black",
        "flex items-center justify-center font-main uppercase shadow text-2xl",
        "transition-colors duration-200 ease-in-out",
        {
          "w-12": !smallStyling,
          "w-8": smallStyling,
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
