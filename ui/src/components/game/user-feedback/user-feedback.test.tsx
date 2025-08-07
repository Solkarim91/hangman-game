import { render, screen } from "@testing-library/react";
import { USER_FEEDBACK_MESSAGES } from "../constants";
import { UserFeedback } from "./user-feedback";
import { getFeedbackMessage } from "../utils";

describe("UserFeedback", () => {
  it("displays incorrect feedback message when user guesses an incorrect letter", () => {
    const isCorrect = false;
    const nextIncorrectGuess = 0;
    const maxLives = 5;

    const feedback = getFeedbackMessage(
      isCorrect,
      nextIncorrectGuess,
      maxLives
    );

    render(
      <UserFeedback userSelectionFeedback={feedback} />
    );

    expect(
      screen.getByText(USER_FEEDBACK_MESSAGES.incorrect)
    ).toBeInTheDocument();
  });

  it("displays correct feedback message when user guesses a correct letter", () => {
    const isCorrect = true;
    const nextIncorrectGuess = 0;
    const maxLives = 5;

    const feedback = getFeedbackMessage(
      isCorrect,
      nextIncorrectGuess,
      maxLives
    );

    render(
      <UserFeedback userSelectionFeedback={feedback} />
    );

    expect(
      screen.getByText(USER_FEEDBACK_MESSAGES.correct)
    ).toBeInTheDocument();
  });

  it("renders no feedback message if game has started but user has not guessed any letters", () => {
    const { container } = render(
      <UserFeedback
        userSelectionFeedback={USER_FEEDBACK_MESSAGES.none}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("applies last chance message when user has 1 life left", () => {
    const isCorrect = false;
    const nextIncorrectGuess = 4;
    const maxLives = 5;

    const feedback = getFeedbackMessage(
      isCorrect,
      nextIncorrectGuess,
      maxLives
    );

    render(
      <UserFeedback userSelectionFeedback={feedback} />
    );

    const message = screen.getByText(USER_FEEDBACK_MESSAGES.lastChance);
    expect(message).toBeInTheDocument();
  });
});
