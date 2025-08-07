import { FC } from "react";
import { OutcomeMessageType } from "../types";
import { GameOutcomeMessage } from "./game-outcome-message";
import { GameButtons } from "../game-buttons/game-buttons";
import { cn } from "@/lib/utils";

type GameOutcomeProps = {
  outcomeMessage: OutcomeMessageType;
  resetGame: () => void;
  handleNewCategory: () => void;
  isMobile: boolean;
};

export const GameOutcome: FC<GameOutcomeProps> = ({
  outcomeMessage,
  resetGame,
  handleNewCategory,
  isMobile
}) => {
  return (
    <div className={cn("flex flex-col gap-10 my-10", {
      "my-8": isMobile
    })}>
      <GameOutcomeMessage outcomeMessage={outcomeMessage} />
      <GameButtons
        resetGame={resetGame}
        handleNewCategory={handleNewCategory}
      />
    </div>
  );
};
