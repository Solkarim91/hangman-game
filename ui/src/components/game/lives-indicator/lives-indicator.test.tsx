import { render, screen } from "@testing-library/react";
import { LivesIndicator } from "./lives-indicator";
import { GAME_STATUS } from "../constants";
import { heartIcon, lifeIcon } from "./selectors";

describe("LivesIndicator", () => {
  it("renders the correct number of heart icons", () => {
    render(
      <LivesIndicator
        maxLives={5}
        numOfIncorrectGuesses={0}
        gameStatus={GAME_STATUS.playing}
        isMobile={false}
      />
    );
    expect(screen.getAllByTestId(lifeIcon)).toHaveLength(5);
  });

  it("renders all filled hearts when no guesses are incorrect", () => {
    render(
      <LivesIndicator
        maxLives={3}
        numOfIncorrectGuesses={0}
        gameStatus={GAME_STATUS.playing}
        isMobile={false}
      />
    );
    const hearts = screen.getAllByTestId(heartIcon);
    hearts.forEach((heart) => {
      expect(heart).toHaveAttribute("fill", "red");
    });
  });

  it("renders the correct number of unfilled hearts for incorrect guesses", () => {
    render(
      <LivesIndicator
        maxLives={5}
        numOfIncorrectGuesses={2}
        gameStatus={GAME_STATUS.playing}
        isMobile={false}
      />
    );
    const hearts = screen.getAllByTestId(heartIcon);

    hearts
      .slice(0, 3)
      .forEach((heart) => expect(heart).toHaveAttribute("fill", "red"));
    hearts
      .slice(3)
      .forEach((heart) => expect(heart).toHaveAttribute("fill", "none"));
  });
});
