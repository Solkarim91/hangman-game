import { render, screen } from "@testing-library/react";
import { LetterTile } from "./letter-tile";
import { GAME_STATUS, LETTER_TILE_STATE } from "../constants";

describe("LetterTile", () => {
  const letter = "A";

  it("should render an underscore in default state", () => {
    render(
      <LetterTile
        char={letter}
        state={LETTER_TILE_STATE.default}
        containsLongWords={false}
        gameStatus={GAME_STATUS.playing}
      />
    );
    expect(screen.getByLabelText("Character '_'")).toBeVisible();
  });

  it("should render the actual letter when it has been guessed correctly", () => {
    render(
      <LetterTile
        char={letter}
        state={LETTER_TILE_STATE.correct}
        containsLongWords={false}
        gameStatus={GAME_STATUS.playing}
      />
    );
    expect(screen.getByLabelText(`Character '${letter}'`)).toBeVisible();
    expect(screen.getByLabelText(`Character '${letter}'`)).toHaveClass(
      "bg-green-500"
    );
  });

  it("should handle space characters correctly", () => {
    render(
      <LetterTile
        char=" "
        state={LETTER_TILE_STATE.default}
        containsLongWords={false}
        gameStatus="playing"
      />
    );
    expect(screen.getByLabelText("Space")).toHaveClass("invisible");
  });

  it("should apply condensed styling if the game phrase contains long words", () => {
    const { container } = render(
      <LetterTile
        char={letter}
        state={LETTER_TILE_STATE.default}
        containsLongWords={true}
        gameStatus="playing"
      />
    );
    expect(container.firstChild).toHaveClass("w-8");
  });
});
