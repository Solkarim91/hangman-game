import { render, screen, fireEvent } from "@testing-library/react";
import { LETTER_STATE, QWERTY_LAYOUT } from "../constants";
import { Keyboard } from "./keyboard";

describe("Keyboard", () => {
  it("renders all keys from QWERTY layout", () => {
    render(<Keyboard onKeyClick={() => {}} />);
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
        onKeyClick={() => {}}
        usedLetters={{ A: LETTER_STATE.correct, B: LETTER_STATE.incorrect }}
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
    render(<Keyboard onKeyClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: /letter m/i }));
    expect(handleClick).toHaveBeenCalledWith("M");
  });
});
