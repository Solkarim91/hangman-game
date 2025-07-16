import { DIFFICULTY, USER_FEEDBACK_MESSAGES } from "./constants";
import { DifficultyType, GameStatusType, LetterTileType } from "./types";

export const checkUserWon = (
  gameWords: string[],
  usedLetters: Record<string, "correct" | "incorrect" | "default">
) => {
  const uniqueChars = new Set(
    gameWords
      .join("")
      .split("")
      .filter((char) => char !== " ")
  );

  const guessedCorrect = Object.entries(usedLetters)
    .filter(([, state]) => state === "correct")
    .map(([char]) => char);

  const hasWon = [...uniqueChars].every((char) =>
    guessedCorrect.includes(char)
  );

  return hasWon;
};

export const checkUserLost = (maxLives: number, incorrectGuesses: number) =>
  Boolean(incorrectGuesses === maxLives);

export const getFeedbackMessage = (
  isCorrect: boolean,
  nextIncorrectGuess: number,
  maxLives: number
): string => {
  if (isCorrect) return USER_FEEDBACK_MESSAGES.correct;
  if (nextIncorrectGuess === maxLives - 1)
    return USER_FEEDBACK_MESSAGES.lastChance;
  return USER_FEEDBACK_MESSAGES.incorrect;
};

export const getTileString = (
  char: string,
  isSpace: boolean,
  state: LetterTileType,
  gameStatus: GameStatusType
) => {
  if (isSpace) {
    return null;
  } else if (state === "correct") {
    return char;
  } else {
    return gameStatus === "lost" ? char : "_";
  }
};

export const getMaxLives = (difficulty: DifficultyType) => {
  if (difficulty === DIFFICULTY.easy) {
    return 6;
  } else if (difficulty === DIFFICULTY.medium) {
    return 5;
  } else {
    return 4;
  }
};
