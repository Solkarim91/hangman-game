import { cn } from "@/lib/utils";
import { FC } from "react";

type LetterTileProps = {
  char: string;
  index: number;
  containsLongWords: boolean;
  state?: "correct" | "default";
};

export const LetterTile: FC<LetterTileProps> = ({
  char,
  index,
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
      aria-label={isSpace ? "Space" : `Char ${char}`} //TODO: replace label when the char is hidden
    >
      {isSpace ? null : char}
    </div>
  );
};
