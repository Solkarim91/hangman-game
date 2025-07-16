import { useState, useCallback, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { DIFFICULTY, GAME_STATUS } from "@/components/game/constants";
import { checkUserLost, checkUserWon, getFeedbackMessage, getMaxLives } from "@/components/game/utils";
import { DifficultyType, GameStatusType, UsedLetterType } from "@/components/game/types";
import { categoryWords } from "@/lib/category-words";
import { formatGamePhrase, getRandomInt } from "@/lib/utils";

type UseGameLogicProps = {
  categoryName: string;
  difficulty?: DifficultyType;
};

type UseGameLogicReturn = {
  gameWords: string[] | undefined;
  gameStatus: GameStatusType;
  usedLetters: Record<string, UsedLetterType>;
  numOfIncorrectGuesses: number;
  userSelectionFeedback: string;
  maxLives: number;
  isGameStarted: boolean;
  handleKeyClick: (letter: string) => void;
  resetGame: () => void;
};

export const useGameLogic = ({categoryName, difficulty = DIFFICULTY.medium} : UseGameLogicProps): UseGameLogicReturn => {
  const [gameWords, setGameWords] = useState<string[]>();
  const [gameStatus, setGameStatus] = useState<GameStatusType>(
    GAME_STATUS.playing
  );
  const [usedLetters, setUsedLetters] = useState<
      Record<string, UsedLetterType>
    >({});
  const [numOfIncorrectGuesses, setNumOfIncorrectGuesses] = useState<number>(0);
  const [userSelectionFeedback, setUserSelectionFeedback] =
    useState<string>("");
    const maxLives = getMaxLives(difficulty);

  const isGameStarted = useMemo(
    () => Object.keys(usedLetters).length !== 0,
    [usedLetters]
  );

  const getNewGameWords = useCallback(() => {
    const words = categoryWords[categoryName];
    const gameWord = words[getRandomInt(words.length)].toUpperCase();
    setGameWords(formatGamePhrase(gameWord));
  }, [categoryName]);

  console.log("gameWords: ", gameWords); //TODO: Remove as being currently used for testing purposes

  useEffect(() => {
    getNewGameWords();
  }, [categoryName, getNewGameWords]);

  useEffect(() => {
    if (!gameWords) return;

    const hasWon = checkUserWon(gameWords, usedLetters);
    const hasLost = checkUserLost(maxLives, numOfIncorrectGuesses);

    if (hasWon) {
      setGameStatus(GAME_STATUS.won);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }

    if (hasLost) {
      setGameStatus(GAME_STATUS.lost);
    }
  }, [usedLetters, gameWords, numOfIncorrectGuesses, maxLives]);

  const handleKeyClick = useCallback(
    (letter: string) => {
      if (!gameWords) return;

      const isCorrect = gameWords.some((word: string) =>
        word.includes(letter)
      );

      setUsedLetters((prev) => ({
        ...prev,
        [letter]: isCorrect ? "correct" : "incorrect",
      }));

      const nextIncorrectGuess = isCorrect
        ? numOfIncorrectGuesses
        : numOfIncorrectGuesses + 1;

      if (!isCorrect) {
        setNumOfIncorrectGuesses(nextIncorrectGuess);
      }

      const feedback = getFeedbackMessage(
        isCorrect,
        nextIncorrectGuess,
        maxLives
      );
      setUserSelectionFeedback(feedback);
    },
    [gameWords, numOfIncorrectGuesses, maxLives]
  );

  const resetGame = useCallback(() => {
    setUsedLetters({});
    setNumOfIncorrectGuesses(0);
    setUserSelectionFeedback("");
    setGameStatus(GAME_STATUS.playing);
    getNewGameWords();
  }, [getNewGameWords]);

  return {
    gameWords,
    gameStatus,
    usedLetters,
    numOfIncorrectGuesses,
    userSelectionFeedback,
    maxLives,
    isGameStarted,
    handleKeyClick,
    resetGame,
  };
};
