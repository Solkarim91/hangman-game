import { FC } from "react";
import { OutcomeMessageType } from "../types";
import { GameOutcomeMessage } from "./game-outcome-message";
import { GameButtons } from "../game-buttons/game-buttons";

type GameOutcomeProps = {
  outcomeMessage: OutcomeMessageType;
  resetGame: () => void;
  handleNewCategoryButtonClick: () => void;
};

export const GameOutcome: FC<GameOutcomeProps> = ({
  outcomeMessage,
  resetGame,
  handleNewCategoryButtonClick,
}) => {
  return (
    <div className="flex flex-col gap-10 mb-10">
      <GameOutcomeMessage outcomeMessage={outcomeMessage} />
      <GameButtons
        resetGame={resetGame}
        handleNewCategoryButtonClick={handleNewCategoryButtonClick}
      />
    </div>
  );
};
