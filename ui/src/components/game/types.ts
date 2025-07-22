import { DIFFICULTY, GAME_OUTCOME_MESSAGES, GAME_STATUS, LETTER_STATE, LETTER_TILE_STATE, USER_FEEDBACK_MESSAGES } from "./constants";

export type DifficultyType = typeof DIFFICULTY[keyof typeof DIFFICULTY];
export type LetterStateType = typeof LETTER_STATE[keyof typeof LETTER_STATE];
export type LetterTileStateType = typeof LETTER_TILE_STATE[keyof typeof LETTER_TILE_STATE];
export type UserSelectionFeedbackType = typeof USER_FEEDBACK_MESSAGES[keyof typeof USER_FEEDBACK_MESSAGES];
export type OutcomeMessageType = typeof GAME_OUTCOME_MESSAGES[keyof typeof GAME_OUTCOME_MESSAGES];
export type GameStatusType = typeof GAME_STATUS[keyof typeof GAME_STATUS];
export type KeyButtonType = LetterStateType;
