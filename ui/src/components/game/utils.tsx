import {
  DIFFICULTY,
  GAME_STATUS,
  LETTER_STATE,
  LETTER_TILE_STATE,
  USER_FEEDBACK_MESSAGES,
} from "./constants";
import {
  DifficultyType,
  GameStatusType,
  LetterTileStateType,
  LetterStateType,
} from "./types";

export const checkUserWon = (
  gameWords: string[],
  usedLetters: Record<string, LetterStateType>
) => {
  const uniqueChars = new Set(
    gameWords
      .join("")
      .split("")
      .filter((char) => char !== " ")
  );

  const guessedCorrect = Object.entries(usedLetters)
    .filter(([, state]) => state === LETTER_STATE.correct)
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
  state: LetterTileStateType,
  gameStatus: GameStatusType
) => {
  if (isSpace) {
    return null;
  } else if (state === LETTER_TILE_STATE.correct) {
    return char;
  } else {
    return gameStatus === GAME_STATUS.lost ? char : "_";
  }
};

export const getMaxLives = (difficulty: DifficultyType) => {
  if (difficulty === DIFFICULTY.difficult) {
    return 4;
  } else if (difficulty === DIFFICULTY.medium) {
    return 5;
  } else {
    return 6;
  }
};
