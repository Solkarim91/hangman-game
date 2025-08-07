import { render, screen } from "@testing-library/react";
import { LetterTiles } from "./letter-tiles";
import { letterTilesContainer } from "./selectors";

describe("LetterTiles", () => {
  const words = ["HELLO", "WORLD"];

  it("should render the correct number of tiles for the game phrase", () => {
    render(
      <LetterTiles
        gameWords={words}
        gameStatus="playing"
        usedLetters={{}}
        isMobile={false}
      />
    );

    const letterCount = words.join("").split("").length;
    expect(screen.getAllByLabelText(/Character/)).toHaveLength(letterCount);
  });

  it("should render the correct letters if the letters have been guessed correctly", () => {
    render(
      <LetterTiles
        gameWords={words}
        gameStatus="playing"
        usedLetters={{ H: "correct", E: "correct" }}
        isMobile={false}
      />
    );

    expect(screen.getByLabelText("Character 'H'")).toHaveClass("bg-green-500");
    expect(screen.getByLabelText("Character 'E'")).toHaveClass("bg-green-500");
    expect(screen.getAllByLabelText("Character '_'")).toHaveLength(8);
  });

  it("should apply condensed spacing if the game phrase contains a long word & is being viewed on a small device", () => {
    render(
      <LetterTiles
        gameWords={["LONGWORD"]}
        gameStatus="playing"
        usedLetters={{}}
        isMobile={true}
      />
    );

    const container = screen.getByTestId(letterTilesContainer);
    expect(container).toHaveClass("gap-1");
  });
});
