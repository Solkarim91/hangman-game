import { cn } from "@/lib/utils";
import { FC } from "react";
import { GameStatusType, LetterTileType } from "./types";
import { getTileString } from "./utils";

type LetterTileProps = {
  char: string;
  containsLongWords: boolean;
  state: LetterTileType;
  gameStatus: GameStatusType;
};

export const LetterTile: FC<LetterTileProps> = ({
  char,
  containsLongWords,
  state,
  gameStatus,
}) => {
  const isSpace = char === " ";

  return (
    <div
      className={cn(
        "w-10 sm:w-12 aspect-square rounded-md border border-black",
        "flex items-center justify-center font-main uppercase shadow text-2xl",
        "transition-colors duration-200 ease-in-out",
        {
          "w-12": !containsLongWords,
          "w-8": containsLongWords,
          "bg-[#6097b9] text-white hover:bg-gray-400":
            state === "default" && !isSpace,
          "bg-green-500 text-white": state === "correct",
          invisible: isSpace,
        }
      )}
      aria-label={
        isSpace
          ? "Space"
          : `Character ${char.replace(char, state === "correct" ? `'${char}'` : "'_'")}`
      }
    >
      {getTileString(char, isSpace, state, gameStatus)}
    </div>
  );
};
