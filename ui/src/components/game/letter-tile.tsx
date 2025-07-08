import { cn } from "@/lib/utils";
import { FC } from "react";
import { LetterTileType } from "./types";

type LetterTileProps = {
  char: string;
  containsLongWords: boolean;
  state?: LetterTileType;
};

export const LetterTile: FC<LetterTileProps> = ({
  char,
  containsLongWords,
  state,
}) => {
  const isSpace = char === " ";

  return (
    <div
      className={cn(
        "w-10 sm:w-12 aspect-square rounded-md",
        "flex items-center justify-center font-main uppercase shadow text-2xl",
        "transition-colors duration-200 ease-in-out",
        {
          "w-12": !containsLongWords,
          "w-8": containsLongWords,
          "bg-[#6097b9] text-white hover:bg-gray-400":
            state === "default" && !isSpace,
          "bg-green-500 text-white border border-black": state === "correct",
          invisible: isSpace,
        }
      )}
      aria-label={
        isSpace
          ? "Space"
          : `Character ${char.replace(char, state === "correct" ? `'${char}'` : "'_'")}`
      }
    >
      {isSpace ? null : char.replace(char, state === "correct" ? char : "_")}
    </div>
  );
};
