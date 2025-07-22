import { render, screen, fireEvent } from "@testing-library/react";
import { KeyButton } from "./key-button";
import { LETTER_STATE } from "../constants";

describe("KeyButton", () => {
  const handleClick = jest.fn();

  it("renders the button with correct letter", () => {
    render(<KeyButton letter="A" onClick={handleClick} />);
    expect(
      screen.getByRole("button", { name: /letter a/i })
    ).toBeInTheDocument();
  });

  it("calls onClick with the letter when clicked", () => {
    render(<KeyButton letter="B" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: /letter b/i }));
    expect(handleClick).toHaveBeenCalledWith("B");
  });

  it("disables the button when `disabled` is true", () => {
    render(<KeyButton letter="C" onClick={handleClick} disabled />);
    expect(screen.getByRole("button", { name: /letter c/i })).toBeDisabled();
  });

  it("applies correct class for `correct` state", () => {
    const { container } = render(
      <KeyButton
        letter="D"
        onClick={handleClick}
        state={LETTER_STATE.correct}
      />
    );
    expect(container.firstChild).toHaveClass("bg-green-500");
  });

  it("applies correct class for `incorrect` state", () => {
    const { container } = render(
      <KeyButton
        letter="E"
        onClick={handleClick}
        state={LETTER_STATE.incorrect}
      />
    );
    expect(container.firstChild).toHaveClass("bg-red-500");
  });
});
