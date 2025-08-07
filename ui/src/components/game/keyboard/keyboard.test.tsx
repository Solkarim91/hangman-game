import { render, screen, fireEvent } from "@testing-library/react";
import { LETTER_STATE, QWERTY_LAYOUT } from "../constants";
import { Keyboard } from "./keyboard";

describe("Keyboard", () => {
  it("displays initial prompt when game has not started", () => {
      render(<Keyboard isGameStarted={false} onKeyClick={() => {}} isMobile={false}/>);
  
      expect(
        screen.getByText(/choose a letter below to get started/i)
      ).toBeInTheDocument();
    });

  it("renders all keys from QWERTY layout", () => {
    render(<Keyboard isGameStarted={false} onKeyClick={() => {}} isMobile={false}/>);
    const qwertyLetters = QWERTY_LAYOUT.flat();

    qwertyLetters.forEach((letter) => {
      expect(
        screen.getByRole("button", {
          name: new RegExp(`Letter ${letter}`, "i"),
        })
      ).toBeInTheDocument();
    });
  });

  it("disables keys with non-default state", () => {
    render(
      <Keyboard
        isGameStarted={true}
        onKeyClick={() => {}}
        usedLetters={{ A: LETTER_STATE.correct, B: LETTER_STATE.incorrect }}
        isMobile={false}
      />
    );
    const buttonA = screen.getByRole("button", { name: /letter a/i });
    expect(buttonA).toBeDisabled();
    expect(buttonA).toHaveClass("bg-green-500");

    const buttonB = screen.getByRole("button", { name: /letter b/i });
    expect(buttonB).toBeDisabled();
    expect(buttonB).toHaveClass("bg-red-500");
  });

  it("calls onKeyClick with correct letter when a key is clicked", () => {
    const handleClick = jest.fn();
    render(<Keyboard isGameStarted={true} onKeyClick={handleClick} isMobile={false} />);
    fireEvent.click(screen.getByRole("button", { name: /letter m/i }));
    expect(handleClick).toHaveBeenCalledWith("M");
  });
});
