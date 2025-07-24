import { render, screen, fireEvent } from "@testing-library/react";
import { KeyButton } from "./key-button";
import { LETTER_STATE } from "../constants";

describe("KeyButton", () => {
  const handleClick = jest.fn();
  const letterA = "A";
  const letterB = "B";
  const letterC = "C";
  const letterD = "D";
  const letterE = "E";

  it("renders the button with correct letter", () => {
    render(<KeyButton letter={letterA} onClick={handleClick} />);
    expect(
      screen.getByRole("button", { name: /letter a/i })
    ).toBeInTheDocument();
  });

  it("calls onClick with the letter when clicked", () => {
    render(<KeyButton letter={letterB} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: /letter b/i }));
    expect(handleClick).toHaveBeenCalledWith(letterB);
  });

  it("disables the button when `disabled` is true", () => {
    render(<KeyButton letter={letterC} onClick={handleClick} disabled />);
    expect(screen.getByRole("button", { name: /letter c/i })).toBeDisabled();
  });

  it("applies correct class for `correct` state", () => {
    const { container } = render(
      <KeyButton
        letter={letterD}
        onClick={handleClick}
        state={LETTER_STATE.correct}
      />
    );
    expect(container.firstChild).toHaveClass("bg-green-500");
  });

  it("applies correct class for `incorrect` state", () => {
    const { container } = render(
      <KeyButton
        letter={letterE}
        onClick={handleClick}
        state={LETTER_STATE.incorrect}
      />
    );
    expect(container.firstChild).toHaveClass("bg-red-500");
  });
});
