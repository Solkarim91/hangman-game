import { DifficultyType, GameStatusType, LetterStateType, LetterTileStateType, UserSelectionFeedbackType } from "./types";

export const QWERTY_LAYOUT: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export const DIFFICULTY: Record<string, DifficultyType> = {
  easy: "easy",
  medium: "medium",
  difficult: "difficult",
};

export const LETTER_STATE: Record<string, LetterStateType> = {
  correct: "correct",
  incorrect: "incorrect",
  default: "default",
};

export const LETTER_TILE_STATE: Record<string, LetterTileStateType> = {
  correct: "correct",
  default: "default",
};

export const USER_FEEDBACK_MESSAGES: Record<string, UserSelectionFeedbackType> = {
  correct: "Nice! ✅",
  incorrect: "Try again ❌",
  lastChance: "Last chance!! 💀"
};

export const GAME_STATUS: Record<string, GameStatusType> = {
  playing: "playing",
  won: "won",
  lost: "lost"
};

export const LETTER_TILE_CONTAINER_VARIANTS = {
  hidden: { y: 0 },
  show: (gameStatus: string) => ({
    y: gameStatus !== GAME_STATUS.playing ? 50 : 0,
    transition: {
      y: { type: "spring", stiffness: 120, damping: 15 },
      staggerChildren: 0.1,
    },
  }),
};

export const LETTER_TILE_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export const LIFE_ICON_CONTAINER_VARIANTS = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const LIFE_ICON_VARIANTS = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
};
