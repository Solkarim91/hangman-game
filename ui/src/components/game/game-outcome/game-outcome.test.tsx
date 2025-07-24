import { render, screen } from "@testing-library/react";
import { GameOutcomeMessage } from "./game-outcome-message";
import { GAME_OUTCOME_MESSAGES } from "../constants";

describe("GameOutcomeMessage", () => {
  it("renders the correct outcome message when game is won", () => {
    render(<GameOutcomeMessage outcomeMessage={GAME_OUTCOME_MESSAGES.won} />);
    expect(screen.getByText(GAME_OUTCOME_MESSAGES.won)).toBeInTheDocument();
  });

  it("renders the correct outcome message when game is lost", () => {
    render(<GameOutcomeMessage outcomeMessage={GAME_OUTCOME_MESSAGES.lost} />);
    expect(screen.getByText(GAME_OUTCOME_MESSAGES.lost)).toBeInTheDocument();
  });
});
