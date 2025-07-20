import { DIFFICULTY, GAME_STATUS, LETTER_STATE, LETTER_TILE_STATE, USER_FEEDBACK_MESSAGES } from "./constants";
import { DifficultyType, LetterStateType } from "./types";
import { checkUserLost, checkUserWon, getFeedbackMessage, getMaxLives, getTileString } from "./utils";

const gameWords = ["new", "york"];

describe("checkUserWon", () => {
  it("returns true when all unique characters are guessed correctly", () => {
    const gameWords = ["new", "york"];
    const usedLetters: Record<string, LetterStateType> = {
      n: LETTER_STATE.correct,
      e: LETTER_STATE.correct,
      w: LETTER_STATE.correct,
      y: LETTER_STATE.correct,
      o: LETTER_STATE.correct,
      r: LETTER_STATE.correct,
      k: LETTER_STATE.correct,
    };

    expect(checkUserWon(gameWords, usedLetters)).toBe(true);
  });

  it("returns false when not all unique characters are guessed", () => {

    const usedLetters: Record<string, LetterStateType> = {
      n: LETTER_STATE.correct,
      e: LETTER_STATE.correct,
      w: LETTER_STATE.correct,
    };

    expect(checkUserWon(gameWords, usedLetters)).toBe(false);
  });
});

describe("getMaxLives", () => {
  it("returns 6 lives when difficulty set to easy", () => {
    const difficulty: DifficultyType = DIFFICULTY.easy;
    expect(getMaxLives(difficulty)).toBe(6);
  });

  it("returns 5 lives when difficulty set to medium", () => {
    const difficulty: DifficultyType = DIFFICULTY.medium;
    expect(getMaxLives(difficulty)).toBe(5);
  });

  it("returns 4 lives when difficulty set to difficult", () => {
    const difficulty: DifficultyType = DIFFICULTY.difficult;
    expect(getMaxLives(difficulty)).toBe(4);
  });
});

describe("checkUserLost", () => {
  const countIncorrectGuesses = (usedLetters: Record<string, LetterStateType>) =>
    Object.values(usedLetters).filter(state => state === LETTER_STATE.incorrect).length;

  it("returns true when all lives have been lost due to incorrect guesses", () => {
    const maxLives = getMaxLives(DIFFICULTY.difficult)
    const usedLetters: Record<string, LetterStateType> = {
      q: LETTER_STATE.incorrect,
      z: LETTER_STATE.incorrect,
      p: LETTER_STATE.incorrect,
      t: LETTER_STATE.incorrect,
    };

    const numOfIncorrectGuesses = countIncorrectGuesses(usedLetters);

    expect(checkUserLost(maxLives, numOfIncorrectGuesses)).toBe(true);
  });

  it("returns false when user still has lives remaining", () => {
    const maxLives = getMaxLives(DIFFICULTY.difficult)
    const usedLetters: Record<string, LetterStateType> = {
      q: LETTER_STATE.incorrect,
      z: LETTER_STATE.incorrect,
      p: LETTER_STATE.incorrect,
      n: LETTER_STATE.correct,
    };

    const numOfIncorrectGuesses = countIncorrectGuesses(usedLetters);

    expect(checkUserLost(maxLives, numOfIncorrectGuesses)).toBe(false);
  });
});

describe("getFeedbackMessage", () => {
  const checkIfLetterCorrect = (letter: string) => gameWords.some((word: string) =>
    word.includes(letter)
  );

  const getFeedbackMessageArgs = (letterGuessed: string, nextIncorrectGuess: number): [boolean, number, number] => {
    const isCorrect = checkIfLetterCorrect(letterGuessed);
    const maxLives = getMaxLives(DIFFICULTY.difficult)

    return [isCorrect, nextIncorrectGuess, maxLives];
  };

  it("returns a correct message when the user guesses a letter correctly", () => {
    const feedbackMessageArgs = getFeedbackMessageArgs("n", 0);
    expect(getFeedbackMessage(...feedbackMessageArgs)).toBe(USER_FEEDBACK_MESSAGES.correct);
  });

  it("returns an incorrect message when the user guesses a letter incorrectly", () => {
    const feedbackMessageArgs = getFeedbackMessageArgs("q", 1);
    expect(getFeedbackMessage(...feedbackMessageArgs)).toBe(USER_FEEDBACK_MESSAGES.incorrect);
  });

  it("returns a last chance message when user is on their last life", () => {
    const feedbackMessageArgs = getFeedbackMessageArgs("q", 3);
    expect(getFeedbackMessage(...feedbackMessageArgs)).toBe(USER_FEEDBACK_MESSAGES.lastChance);
  });
});

describe("getTileString", () => {
  it("returns null for spaces", () => {
    expect(getTileString("a", true, LETTER_TILE_STATE.default, GAME_STATUS.playing)).toBeNull();
  });

  it("returns the character if the letter state is correct", () => {
    expect(getTileString("a", false, LETTER_TILE_STATE.correct, GAME_STATUS.playing)).toBe("a");
    expect(getTileString("a", false, LETTER_TILE_STATE.correct, GAME_STATUS.lost)).toBe("a");
    expect(getTileString("a", false, LETTER_TILE_STATE.correct, GAME_STATUS.won)).toBe("a");
  });

  it("returns an underscore if the letter is not correct and game is not lost", () => {
    expect(getTileString("b", false, LETTER_TILE_STATE.default, GAME_STATUS.playing)).toBe("_");
    expect(getTileString("c", false, LETTER_TILE_STATE.default, GAME_STATUS.won)).toBe("_");
  });

  it("returns the character if the letter is not correct but the game is lost", () => {
    expect(getTileString("e", false, LETTER_TILE_STATE.default, GAME_STATUS.lost)).toBe("e");
  });
});

