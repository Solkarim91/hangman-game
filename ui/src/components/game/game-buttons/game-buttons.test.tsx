import { fireEvent, render, screen } from "@testing-library/react";
import { GameButtons } from "./game-buttons";
import { newCategoryButton, playAgainButton } from "./selectors";

describe("GameButtons", () => {
  const resetGame = jest.fn();
  const handleNewCategory = jest.fn();

  it("calls resetGame when 'PLAY AGAIN' is clicked", () => {
    render(
      <GameButtons
        resetGame={resetGame}
        handleNewCategory={handleNewCategory}
      />
    );

    const playAgainBtn = screen.getByTestId(playAgainButton);
    fireEvent.click(playAgainBtn);

    expect(resetGame).toHaveBeenCalledTimes(1);
  });

  it("calls handleNewCategory when 'NEW CATEGORY' is clicked", () => {
    render(
      <GameButtons
        resetGame={resetGame}
        handleNewCategory={handleNewCategory}
      />
    );

    const newCategoryBtn = screen.getByTestId(newCategoryButton);
    fireEvent.click(newCategoryBtn);

    expect(handleNewCategory).toHaveBeenCalledTimes(1);
  });
});
