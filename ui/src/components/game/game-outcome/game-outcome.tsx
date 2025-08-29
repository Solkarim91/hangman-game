import { FC } from "react";
import { OutcomeMessageType } from "../types";
import { GameOutcomeMessage } from "./game-outcome-message";
import { GameButtons } from "../game-buttons/game-buttons";

type GameOutcomeProps = {
  outcomeMessage: OutcomeMessageType;
  resetGame: () => void;
  handleNewCategory: () => void;
};

export const GameOutcome: FC<GameOutcomeProps> = ({
  outcomeMessage,
  resetGame,
  handleNewCategory,
}) => {
  return (
    <div className="flex flex-col gap-8 my-8">
      <GameOutcomeMessage outcomeMessage={outcomeMessage} />
      <GameButtons
        resetGame={resetGame}
        handleNewCategory={handleNewCategory}
      />
    </div>
  );
};
