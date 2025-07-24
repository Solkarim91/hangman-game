import { render, screen } from "@testing-library/react";
import { GameIcon } from "./game-icon";
import { gameOverLogo, logo } from "@/components/ui/selectors";
import { GAME_STATUS } from "../constants";

describe("GameIcon", () => {
  it("renders the Logo when game is playing", () => {
    render(<GameIcon gameStatus={GAME_STATUS.playing} />);
    expect(screen.getByTestId(logo)).toBeInTheDocument();
    expect(screen.queryByTestId(gameOverLogo)).not.toBeInTheDocument();
  });

  it("renders the Logo when game is won", () => {
    render(<GameIcon gameStatus={GAME_STATUS.playing} />);
    expect(screen.getByTestId(logo)).toBeInTheDocument();
    expect(screen.queryByTestId(gameOverLogo)).not.toBeInTheDocument();
  });

  it("renders the GameOverLogo when game is lost", () => {
    render(<GameIcon gameStatus={GAME_STATUS.lost} />);
    expect(screen.getByTestId(gameOverLogo)).toBeInTheDocument();
    expect(screen.queryByTestId(logo)).not.toBeInTheDocument();
  });
});
